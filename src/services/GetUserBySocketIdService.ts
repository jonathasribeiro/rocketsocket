import { injectable } from 'tsyringe';
import { User } from '../schemas/User';

@injectable()
class GetUserBySocketIdService {
    async execute(socket_id: string) {
        return await User.findOne({ socket_id });
    }
}

export { GetUserBySocketIdService }