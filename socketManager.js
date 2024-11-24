import { Server } from 'socket.io';
import Message from "./model/message.js";


export class SocketManager {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: "http://localhost:2999/room/2",
                methods: ["GET", "POST"]
            }
        });

        this.initEvents();
    }

    initEvents() {
        this.io.on('connection', (socket) => {
            console.log('Un utilisateur est connecté');

            // Rejoindre une room spécifique
            socket.on('joinRoom', ({ roomId }) => {
                socket.join(roomId);
                console.log(`Utilisateur a rejoint la room: ${roomId}`);
            });

            // Réception d'un message de chat
            socket.on('chatMessage', async ({ roomId, userId, message }) => {
                const newMessage = await Message.create({
                    roomId: roomId,
                    senderId: userId,
                    content: message
                });

                this.io.to(roomId).emit('message', {
                    senderId: userId,
                    content: message,
                });
            });

            // Gérer la déconnexion
            socket.on('disconnect', () => {
                console.log('Utilisateur déconnecté');
            });
        });
    }
}
