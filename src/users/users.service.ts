import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async getAll(): Promise<User[]>{
        return await this.userRepository.find();
    }

    async createUser( userNuevo: CreateUserDto): Promise<User>{

        if(!userNuevo.name){ 
            throw new HttpException('Error al no enviar el nombre de usuario', HttpStatus.NOT_FOUND)
        }
        if(!userNuevo.lastName){ 
            throw new HttpException('Error al no enviar el apellido de usuario', HttpStatus.NOT_FOUND)
        }
        if(!userNuevo.Phone){ 
            throw new HttpException('Error al no enviar el telefono', HttpStatus.NOT_FOUND)
        }
        const nuevo = new User();
        nuevo.name = userNuevo.name;
        nuevo.lastName = userNuevo.lastName;
        nuevo.Phone = userNuevo.Phone;
        return this.userRepository.save(nuevo);
    }

    async updateUser(iduser: number, userActualizar: CreateUserDto): Promise<User>{
        const userUpdate= await this.userRepository.findOne(iduser);
        userUpdate.name = userActualizar.name;
        userUpdate.lastName = userActualizar.lastName;
        userUpdate.Phone = userActualizar.Phone;

        return  await this.userRepository.save(userUpdate)
    }

    async deleteUser(idUser: number): Promise<any>{
        return await this.userRepository.delete(idUser)
    }

}
