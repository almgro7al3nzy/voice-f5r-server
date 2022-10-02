// ------------------ Services ----------------
const otpService = require('../services/otp-service');
const hashService = require('../services/hash-service');
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');

// ---------------- Data Transform Object --------------
const UserDto = require('../dtos/user-dto');

class AuthController {
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            res.status(400).json({ message: 'Phone field is required!' });
        }
        const ttl = 1000 * 60 * 2; // 2 min 
        const expires = Date.now() + ttl;
        const otp = await otpService.generateOtp();
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);
        try {
            //await otpService.sendBySms(phone, otp);
            res.json({ hash: `${hash}.${expires}`, phone, otp, });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'message sending failed' });
        }
    }
    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            res.status(400).json({ message: 'All fields are required!' });
        }
        const [hashedOtp, expires] = hash.split('.');
        if (Date.now() > +expires) {// addinf + sign so that we can convert string to number
            res.status(400).json({ message: 'OTP expired!' });
        }

        const data = `${phone}.${otp}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Db error' });
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false,
        });

        await tokenService.storeRefreshToken(refreshToken, user._id);// storing refresh token in database

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,// 30 days
            httpOnly: true,
        });
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async refresh(req, res) {
        // get refresh token from cookie

        const { refreshToken: refreshTokenFromCookie } = req.cookies

        // check if token is valid
        let userData;
        try {
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        } catch (error) {
            return res.status(401).json({ message: "invalid Token" })
        }

        // check if token is in db
        try {
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie)
            if (!token) {
                return res.status(401).json({ message: "invalid Token" })
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal error" })
        }

        // check if user in referesh token is present in user collection
        const user = await userService.findUser({ _id: userData._id })
        if (!user) {
            return res.status(404).json({ message: "No User" })
        }

        // Generate New tokens
        const { refreshToken, accessToken } = tokenService.generateTokens({ _id: user._id, })

        // update refresh token in db
        try {
            tokenService.updateRefreshToken(userData._id, refreshToken)
        } catch (error) {
            return res.status(500).json({ message: "Internal error" })
        }

        // add tokens in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,// 30 days
            httpOnly: true,
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        // sending response
        const userDto = new UserDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        // delete refresh token from db
        await tokenService.removeToken(refreshToken);
        // delete cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({ user: null, auth: false });
    }
}
module.exports = new AuthController();