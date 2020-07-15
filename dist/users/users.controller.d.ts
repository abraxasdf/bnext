import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, response: any, request: any): void;
    getAll(response: any, request: any): void;
    update(updateUserDto: CreateUserDto, response: any, idUser: any): void;
    delete(response: any, idUser: any): void;
}
