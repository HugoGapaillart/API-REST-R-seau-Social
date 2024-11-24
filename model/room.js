import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../data/index.js';

class Room extends Model {} 

Room.init(
    {
        
    },
    {
        // Other model options go here
        sequelize,  // We need to pass the connection instance
        modelName: 'Room', // We need to choose the model name
    },
);

export default Room;