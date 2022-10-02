exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        // res.status(403).send('로그인 필요');
        res.redirect("/api/auth/login");
    }
};

exports.haveNickname = function (req, res, next) {
    if (req.user.nickname === "") {
        res.redirect("/setNickname");
    }
    else {
        next();
    }
};


exports.isNotLoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/");
    }
};
