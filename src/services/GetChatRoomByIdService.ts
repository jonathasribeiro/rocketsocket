import { injectable } from 'tsyringe';
import { ChatRoom } from '../schemas/ChatRoom';

@injectable()
class GetChatRoomByIdService {
    async execute(idChatRoom: string) {
        return await ChatRoom.findOne({
            idChatRoom
        }).populate('idUsers').exec();
    }
}

export { GetChatRoomByIdService }