const path = require('path');

module.exports = (app) => {
    app.get('/api/auth/login', (req, res) => {
        res.sendFile(path.join(__dirname + '/login.html'));
    })

    app.get('/setNickname', (req, res) => {
        res.sendFile(path.join(__dirname + '/setNickname.html'));
    })

    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname + '/register.html'));
    })

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/main.html'));
    })

}