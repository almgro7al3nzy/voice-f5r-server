const mongoose = require("mongoose");

const { Schema } = mongoose;


const roomSchema = new Schema({
    users: [{
        username: { type: String, required: true },
        userID: { type: String, required: true }
    }],
    voiceUsers: [{
        username: { type: String, required: true },
        userID: { type: String, required: true }
    }],
    messageHistory: [{
        message: { type: String, required: true },
        username: { type: String, required: true },
        time: { type: String, required: true }
    }]
});


module.exports = mongoose.model("Room", roomSchema);