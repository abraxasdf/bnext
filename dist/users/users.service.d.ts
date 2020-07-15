import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user-dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getAll(): Promise<User[]>;
    createUser(userNuevo: CreateUserDto): Promise<User>;
    updateUser(iduser: number, userActualizar: CreateUserDto): Promise<User>;
    deleteUser(idUser: number): Promise<any>;
}
