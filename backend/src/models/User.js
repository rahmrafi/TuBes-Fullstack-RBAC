const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin({ usernameField: 'username', emailField: 'email' });
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', UserSchema);

module.exports = User;