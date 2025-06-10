const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');


const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    name: {
        type:String,
        unique: true
    },
    description: String
});

permissionSchema.plugin(findOrCreate);

const Permission = new mongoose.model('Permission', permissionSchema);

module.exports = Permission;
