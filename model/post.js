import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';

class Post extends Model {} 

Post.init(
    {
        // Model attributes are defined here
        titre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contenu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'Post', // We need to choose the model name
    },
);

export default Post;