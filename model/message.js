import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';
import User from './user.js';

class Message extends Model {} 

Message.init(
    {
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: User,
              key: 'id'
            }
          },
          content: {
            type: DataTypes.TEXT,
            allowNull: false
          }
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'Message', // We need to choose the model name
    },
);

export default Message;