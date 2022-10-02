const { checkRoomStructure, checkUsersStructure } = require('./Constant/checkStructure');
const { isString, isObject, isBoolean, isArray } = require('./Constant/checkTypeOrEmpty');
const admin = require('firebase-admin');
const FieldValue = admin.firestore.FieldValue;
const db = admin.firestore();

exports.isDuplicateNicknameAndEmail = async ({ nickname, email }) => {
    let duplicate = false;
    let userList = [];
    if (isString(nickname) &&
        isString(email)) {
        const userRef = db.collection('users');
        const snapshot1 = await userRef.where('nickname', "==", nickname).get();
        console.log(snapshot1.empty)
        if (!snapshot1.empty) {
            duplicate = true;
            snapshot1.forEach(doc => {
                userList.push(doc.data());
            });
            console.log(userList)
        }

        const snapshot2 = await userRef.where('email', '==', email).get();
        console.log(snapshot2.empty)
        if (!snapshot2.empty) {
            duplicate = true;
            snapshot2.forEach(doc => {
                userList.push(doc.data());
            });
            console.log(userList)
        }
    }
    else {
        console.error("isDuplicateNicknameAndEmail error");
    }
    return { userList, duplicate };
}

// exports.isDuplicateNicknameAndEmail = async ({ nickname, email }) => {
//     let duplicate = false;
//     let userList = [];
//     if (isString(nickname) &&
//         isString(email)) {



//     }
//     else {
//         console.error("isDuplicateNicknameAndEmail error");
//     }
//     return { userList, duplicate };

// }

exports.isDuplicateNickname = async ({ nickname }) => {
    let duplicate = false;
    let userList = [];
    if (isString(nickname)) {
        const userRef = db.collection('users');
        const snapshot = await userRef.where('nickname', "==", nickname).get();
        console.log(snapshot.empty)
        if (!snapshot.empty) {
            duplicate = true;
            snapshot.forEach(doc => {
                userList.push(doc.data());
            });
            console.log(userList)
        }
    }
    else {
        console.error("isDuplicateNickname error");
    }
    return { userList, duplicate };
}

exports.isDuplicateEmail = async ({ email }) => {
    let duplicate = false;
    let userList = [];
    if (isString(email)) {
        const userRef = db.collection('users');
        const snapshot = await userRef.where('email', '==', email).get();
        console.log(snapshot.empty)
        if (!snapshot.empty) {
            duplicate = true;
            snapshot.forEach(doc => {
                userList.push(doc.data());
            });
            console.log(userList)
        }
    }
    else {
        console.error("isDuplicateEmail error");
    }
    return { userList, duplicate };
}

exports.createUser = async ({ user }) => {
    try {
        // console.log(user)
        const usingSns = false;
        const sns = {
            provider: "",
            id: "",
        }
        const report = {
            const: 0,
            time: 0,
        }
        const numberOfGames = {
            win: 0,
            lose: 0,
        }
        if (checkUsersStructure(user)) {
            const {
                nickname,
                email,
                password,
            } = user;
            if (!(await this.isDuplicateNicknameAndEmail({ nickname, email })).duplicate) {
                // const res = db.collection("users").doc(nickname);
                const res = db.collection("users");
                const setReturn = await res.add({
                    nickname,
                    email,
                    password,
                    usingSns,
                    sns,
                    numberOfGames,
                    report,
                    timestamp: FieldValue.serverTimestamp(),
                });
                // const updateReturn = await res.update({ timestamp: FieldValue.serverTimestamp() })
                // console.log(setReturn, updateReturn)
                return { success: true }
            }
            else {
                return { success: false }
            }
        }
        else {
            console.error("createUsersArgumentCheck error");
            return { success: false }
        }
    }
    catch (error) {
        console.error(error);
        return { success: false }
    }

}


exports.createUserForSns = async ({ user }) => {
    try {
        // console.log(user)
        const usingSns = true;
        const report = {
            const: 0,
            time: 0,
        }
        const numberOfGames = {
            win: 0,
            lose: 0,
        }
        if (isString(user.email) &&
            isObject(user.sns)) {
            if (!(await this.isDuplicateEmail({ email: user.email })).duplicate) {
                // const res = db.collection("users").doc(nickname);
                const res = db.collection("users");
                const setReturn = await res.add({
                    nickname: "",
                    email: user.email,
                    password: false,
                    usingSns,
                    sns: user.sns,
                    numberOfGames,
                    report,
                    timestamp: FieldValue.serverTimestamp(),
                });
                return { success: true }
            }
            else {
                return { success: false }
            }
        }
        else {
            console.error("createUserForSns ArgumentCheck error");
            return { success: false }
        }
    }
    catch (error) {
        console.error(error);
        return { success: false }
    }

}

exports.deleteUserFromEmail = async ({ email }) => {
    // 수정중
    let success = false;
    try {
        console.log(email)
        if (isString(email)) {
            console.log("email")
            const result = await db.collection('users').where("email", "==", email).get();
            if (!result.empty) {
                result.forEach((doc) => {
                    doc.ref.delete()
                })
                success = true;
            }
        }
        else {
            console.error("deleteUserFromEmail error");
        }
        return { success }
    }
    catch (error) {
        console.error(error);
        return { success }
    }
}

exports.deleteUserFromNickname = async ({ nickname }) => {
    let success = false;
    try {
        console.log(nickname);
        if (isString(nickname)) {
            const batch = db.batch();
            const snapshot = await db.collection('users').where('nickname', '==', nickname).get();
            snapshot.docs.forEach(async doc => {
                batch.delete(doc.ref);
                success = true;
            });
            await batch.commit();
        }
        else {
            console.error("deleteUserFromNickname error");
        }
        return { success };
    }
    catch (error) {
        console.error(error);
        return { success }
    }
}


exports.getUserFromEmail = async ({ email }) => {
    let success = false;
    let userList = [];
    if (isString(email)) {
        const userRef = db.collection('users');
        const result = await userRef.where('email', "==", email).get();
        if (!result.empty && result._size === 1) {
            success = true;
            result.forEach((doc) => {
                const { report, numberOfGames, nickname, email, sns } = doc.data()
                userList.push({ report, numberOfGames, nickname, email, sns })
            });
        }
    }
    else {
        console.error("getUserFromEmail error");
    }
    return { user: userList[0], success };
}

exports.getUserFromNickname = async ({ nickname }) => {
    let success = false;
    let userList = [];
    if (isString(nickname)) {
        const userRef = db.collection('users');
        const result = await userRef.where('nickname', "==", nickname).get();
        if (!result.empty && result._size === 1) {
            success = true;
            result.forEach((doc) => {
                const { report, numberOfGames, nickname, email } = doc.data()
                userList.push({ report, numberOfGames, nickname, email })
            });
        }
    }
    else {
        console.error("getUserFromNickname error");
    }
    return { user: userList[0], success };
}

exports.checkNicknameDuplication = async ({ nickname }) => {
    let duplicateNickname = false;
    let result = {};
    if (isString(nickname)) {
        const userRef = db.collection('users');
        result = await userRef.where('nickname', "==", nickname).get();
        if (!result.empty) {
            duplicateNickname = true;
        }
    }
    else {
        console.error("checkNicknameDuplication error");
    }
    return { duplicateNickname };
}

exports.checkEmailDuplication = async ({ email }) => {
    console.log(email)
    let duplicateEmail = false;
    let result = {};
    if (isString(email)) {
        const userRef = db.collection('users');
        result = await userRef.where('email', "==", email).get();
        if (!result.empty) {
            duplicateEmail = true;
        }
    }
    else {
        console.error("checkEmailDuplication error");
    }
    return { duplicateEmail };
}

exports.checkLocalLogin = async ({ nickname, password }) => {
    let success = false;
    let user = {}
    try {
        console.log("checkLocalLogin function");
        if (isString(nickname) &&
            isString(password)) {
            const snapshot = await db.collection('users')
                .where("nickname", "==", nickname)
                .where('password', '==', password)
                .get();
            if (!snapshot.empty && snapshot._size === 1) {
                snapshot.forEach(async doc => {
                    success = true;
                    const { password, sns, ...userForSend } = doc.data();
                    user = userForSend;
                });
            }
        }
        else {
            console.error("checkLocalLogin argument error");
        }
        console.log("user", user)
        return { user, success };
    }
    catch (err) {
        return { user, success: false };
    }
}



exports.getSnsInUser = async ({ provider, id }) => {
    let success = false;
    let user = {};
    let docId = "";
    console.log(provider, id)
    if (isString(provider) &&
        isString(id)) {
        const userRef = db.collection('users');
        const result = await userRef.where("sns", "==", { id, provider }).get();
        result.forEach((doc) => {
            success = true;
            const { password, sns, ...userForSend } = doc.data();
            user = userForSend;
            docId = doc.id;
        })
    }
    else {
        console.error("getSnsInUser error");
    }
    console.log("getSnsInUser : ", docId)
    return { user, success, docId };
}

exports.joinSnsInUser = async ({ nickname, email, provider, id }) => {
    try {
        let success = false;
        if (isString(email)) {
            const batch = db.batch();
            const snapshot = await db.collection('users')
                .where("usingSns", "==", false)
                .where('nickname', '==', nickname)
                .where("email", "==", email)
                .where("sns", "==", { provider: "", id: "" })
                .get();
            if (snapshot.empty) {
                snapshot.docs.forEach(async doc => {
                    batch.update({ usingSns: true, sns: { provider, id } });
                    success = true;
                });
                await batch.commit();
            }
        }
        else {
            console.error("joinSnsInUser argument error");
        }
        return { success };
    }
    catch (err) {
        return { success: false };
    }
}


exports.setNickname = async ({ nickname, id, provider }) => {
    let success = false;
    try {
        if (!await this.checkNicknameDuplication({ nickname }).duplicate) {
            const resultGetSnsInUser = await this.getSnsInUser({ id, provider });
            if (resultGetSnsInUser.success && resultGetSnsInUser.user.nickname === '') {
                success = true;
                const userRef = db.collection('users').doc(resultGetSnsInUser.docId);
                await userRef.update({ nickname })
            }
        }
    }
    catch (err) {
        console.log(err)
    }
    return { success }
}


exports.disconnectSnsInUser = async ({ nickname, email }) => {
    let duplicateEmail = false;
    let result = {};
    if (isString(email)) {
        const userRef = db.collection('users');
        result = await userRef.where('usingSns', "==", false)
            .where("nickname", "array-contains", { provider: "", id: "" }).get();
        if (!result.empty) {
            duplicateEmail = true;
        }
    }
    else {
        console.error("disconnectSnsInUser error");
    }
    return { duplicateEmail };
}