import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';

class Comment extends Model {} 

Comment.init(
    {
        // Model attributes are defined here
        contenu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'Comment', // We need to choose the model name
    },
);

export default Comment;