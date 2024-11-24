import User from '../model/user.js';
import Room from '../model/room.js';
import { MyError } from '../classes/MyError.js';

export async function createRoom(userInvited, userId){
    try {
        const room = await Room.findOne({
            include: {
                model: User,
                where: {
                    id: [userInvited, userId]
                },
                required: true
            }
        });

        if (!room) {
            const newRoom = await Room.create();
            await newRoom.addUsers([userInvited, userId]);
            console.log('Nouvelle room créée');
        }else{
            console.log('Une room existe déjà entre ces utilisateurs');
        }
    } catch (err) {
        console.log(err);
        console.log(err.message);
        throw new MyError(500, err.message);
    }
}