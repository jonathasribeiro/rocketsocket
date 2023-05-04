import { injectable } from 'tsyringe';
import { User } from '../schemas/User';

@injectable()
class GetAllUsersService {
    async execute() {
        return await User.find();
    }
}

export { GetAllUsersService }