import { container } from 'tsyringe';
import { io } from '../http';
import { CreateChatRoomService } from '../services/CreateChatRoomService';
import { CreateMessageService } from '../services/CreateMessageService';
import { CreateUserService } from '../services/CreateUserService';
import { GetAllUsersService } from '../services/GetAllUsersService';
import { GetChatRoomByIdService } from '../services/GetChatRoomByIdService';
import { GetChatRoomByUsersService } from '../services/GetChatRoomByUsersService';
import { GetMessagesByChatRoomService } from '../services/GetMessagesByChatRoomService';
import { GetUserBySocketIdService } from '../services/GetUserBySocketIdService';

io.on('connect', (socket) => {
    // io.emit() send global information to all users
    // socket.emit() can send information to specific user
    // socket.emit() and socket.on() can be done from server or client side

    socket.on('start', async (data) => {
        const { email, avatar, name } = data;
        const createUserService = container.resolve(CreateUserService)

        const user = await createUserService.execute({ email, avatar, name, socket_id: socket.id });

        //broadcast sends msg to all users except current
        socket.broadcast.emit('new_users', user);
    });

    socket.on('get_users', async (callback) => {
        const getAllUsersService = container.resolve(GetAllUsersService);
        const users = await getAllUsersService.execute();

        callback(users);
    });

    socket.on('start_chat', async (data, callback) => {
        const createChatRoomService = container.resolve(CreateChatRoomService);
        const getChatRoomByUsersService = container.resolve(GetChatRoomByUsersService);
        const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
        const getMessagesByChatRoomService = container.resolve(GetMessagesByChatRoomService);

        const loggedUser = await getUserBySocketIdService.execute(socket.id);

        let room = await getChatRoomByUsersService.execute([data.idUser, loggedUser._id])

        if (!room) {
            room = await createChatRoomService.execute([data.idUser, loggedUser._id]);
        }

        socket.join(room.idChatRoom);

        //buscar msgs da sala
        const messages = await getMessagesByChatRoomService.execute(room.idChatRoom);

        callback({ room, messages });
    });

    socket.on('message', async (data) => {
        //buscar as info do user (socket.id)
        const getUserBySocketIdService = container.resolve(GetUserBySocketIdService);
        const user = await getUserBySocketIdService.execute(socket.id);

        //savar a msg
        const createMessageService = container.resolve(CreateMessageService);
        const message = await createMessageService.execute({
            to: user._id,
            text: data.message,
            roomId: data.idChatRoom
        });

        //enviar a msg pra outros users da sala
        io.to(data.idChatRoom).emit('message', {
            message,
            user
        });

        //enviar notificação pro user correto
        const getChatRoomByIdService = container.resolve(GetChatRoomByIdService);
        const room = await getChatRoomByIdService.execute(data.idChatRoom);

        const userFrom = room.idUsers.find(res => String(res._id) !== String(user._id));

        io.to(userFrom.socket_id).emit('notification', {
            newMessage: true,
            roomId: data.idChatRoom,
            from: user
        });
    });
});