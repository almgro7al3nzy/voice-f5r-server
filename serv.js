const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
const socketModule = require("./Common/socketMoudle");
const morgan = require('morgan');
const passportModule = require('./Common/passport');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const config = require('./config');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const routerApp = require('./routes/app');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.secret));
app.use(flash());
app.use(
    expressSession({ // 옵션은 반드시 넣어줘야 한다.
        resave: false, // 매번 세션 강제 저장
        saveUninitialized: false, // 빈 값도 저장
        secret: config.secret, // cookie 암호화 키. dotenv 라이브러리로 감춤
        cookie: {
            httpOnly: true, // javascript로 cookie에 접근하지 못하게 하는 옵션
            secure: false, // https 프로토콜만 허락하는 지 여부
        },
    }),
);



app.use(passport.initialize());
app.use(passport.session());
passportModule(passport);

// use morgan Library
app.use(morgan('dev'))

// cors exception
app.use(cors());

// using json parse
app.use(jsonParser)

// use socket IO
socketModule({ io });

// default page


// app.get('/api/auth/login', (req, res) => {
//     res.sendFile(path.join(__dirname + '/login.html'));
// })

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/main.html'));
// })

routerApp(app);



// api page
app.use('/api', require('./routes/api'))

// default server port 4000
server.listen(process.env.PORT || 4000, () => console.log('server is running on port 4000'));

