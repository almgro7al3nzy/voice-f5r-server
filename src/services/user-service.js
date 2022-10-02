const UserModel = require('../models/user-model');// its a nmaing convection that we keep first letter capital of model
class UserService {
    async findUser(filter) {
        const user = await UserModel.findOne(filter);
        return user;
    }

    async createUser(data) {
        const user = await UserModel.create(data);
        return user;
    }
}

module.exports = new UserService();