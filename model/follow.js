import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';

class Follow extends Model {} 

Follow.init(
    {
        // Model attributes are defined here
        followId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        followedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'Follow', // We need to choose the model name
    },
);

export default Follow;