const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');


const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type:String,
        unique:true
    },
    description: String,
    permissions: [String]
});

RoleSchema.plugin(findOrCreate);

const Role = new mongoose.model('Role', RoleSchema);

module.exports = Role;