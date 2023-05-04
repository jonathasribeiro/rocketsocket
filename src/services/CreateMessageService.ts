import { injectable } from 'tsyringe';
import { Message } from '../schemas/Message';

interface CreateMessagedto {
    to: string;
    text: string;
    roomId: string;
}

@injectable()
class CreateMessageService {
    async execute(createMessageDto: CreateMessagedto) {
        const message = await Message.create(createMessageDto);
        return message;
    }
}

export { CreateMessageService }