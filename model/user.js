import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';

class User extends Model {} 

User.init(
    {
        // Model attributes are defined here
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING,
            },
        photo: {
            type: DataTypes.STRING,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        psw:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
);

export default User;