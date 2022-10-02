const secret_config = require('../../config.js');
const NaverStrategy = require('passport-naver').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { isString, isObject, isBoolean, isArray } = require('../fireBaseDB/Constant/checkTypeOrEmpty');


const { getSnsInUser, getUserFromNickname, checkLocalLogin, getUserFromEmail, createUser, isDuplicateEmail, createUserForSns } = require("../fireBaseDB/user");

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log('passport session save: ', user.email);
        done(null, user.email);
    });

    passport.deserializeUser(async (email, done) => {
        console.log("deserializeUser : ", email);
        // if (nickname !== undefined) {
        //     const returnValueFromDb = await getUserFromNickname({ nickname });
        //     done(null, returnValueFromDb.user)
        // }
        // const returnValueFromDb = await getUserFromNickname({ nickname });
        const returnValueFromDb = await getUserFromEmail({ email });
        done(null, returnValueFromDb.user)
    });

    passport.use(
        new NaverStrategy(
            {
                'clientID': secret_config.federation.naver.clientID,
                'clientSecret': secret_config.federation.naver.clientSecret,
                'callbackURL': '/api/auth/login/naver/callback',
                passReqToCallback: true,
            },
            async (req, accessToken, refreshToken, profile, done) => {
                console.log("profile : ", profile);
                console.log("req.isAuthenticated() : ", req.isAuthenticated())
                // console.log('req : ', req)
                console.log(req.protocol + '://' + req.get('host') + "||||" + req.originalUrl)
                var _profile = profile._json;
                const { provider } = profile;
                const { id, email } = profile._json;
                console.log(provider, id, email);
                if (isString(provider) &&
                    isString(id) &&
                    isString(email)) {
                    const { user, success } = await getSnsInUser({ id, provider });
                    const { duplicate } = await isDuplicateEmail({ email })
                    if (success) {
                        // sns로 가입된 계정이 있을 때
                        done(null, { nickname: user.nickname, email: user.email });
                    }
                    else {
                        // sns로 가입된 계정이 없을 때
                        if (!duplicate) {
                            // 이메일이 중복되지 않았다면 가입한다.
                            const { success } = await createUserForSns({
                                user: {
                                    email,
                                    sns: { provider, id }
                                }
                            })
                            if (success) {
                                // 회원가입 성공이면
                                done(null, { nickname: "", email })
                            }
                            else {
                                // 회원가입 실패이면
                                done("네이버 간편 회원가입 실패", false);
                            }
                        }
                        else {
                            // 이메일이 중복되었다면 로그인 실패 및 가입불가 안내
                            done("로그인 실패 : 해당 이메일로 가입된 계정이 있습니다.", false);
                        }
                    }
                }
                else {
                    done("로그인 실패 : 이메일을 받아와야 합니다.");
                }

            }
        )
    );

    passport.use(
        new KakaoStrategy(
            {
                'clientID': secret_config.federation.kakao.clientID,
                'callbackURL': '/api/auth/login/kakao/callback',
                passReqToCallback: true
            },
            async (req, accessToken, refreshToken, profile, done) => {
                console.log("profile : ", profile);
                var _profile = profile._json;
                const provider = String(profile.provider);
                const id = String(profile.id);
                console.log(provider, id)
                const { user, success } = await getSnsInUser({ id, provider });
                console.log(user, success)
                if (success) {
                    done(null, { nickname: user.nickname, email: user.email });
                }
                else {
                    done("로그인 실패 : 가입 된 계정이 없습니다.");
                }
            }
        )
    );

    passport.use(
        new LocalStrategy(
            {
                usernameField: 'nickname',
                passwordField: 'password',
                passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
            },
            async (req, nickname, password, done) => {
                const { user, success } = await checkLocalLogin({ nickname, password });
                if (success) {
                    console.log("로컬 로그인 성공");
                    done(null, user);
                }
                else {
                    console.log("로컬 로그인 실패");
                    done("로그인 실! 패!");
                }
            }
        )
    );
}

