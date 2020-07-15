import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param ,HttpException, Req} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service'; 
import { response } from 'express';

const specialReg = new RegExp(/[0-9$-/:-?{-~!"^_`\[\]]/);
const specialRegnum = new RegExp(/[a-zA-Z$-/:-?{-~!"^_`\[\]]/);

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){

    }

    @Post()
    create(@Body() createUserDto: CreateUserDto, @Res() response, @Req() request){
        
        if(!createUserDto.name  || createUserDto.name.length == 0 || specialReg.test(createUserDto.name)||  (typeof createUserDto.name != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el nombre usuario.'  }, HttpStatus.BAD_REQUEST)
        }
        if(!createUserDto.lastName  || createUserDto.lastName.length == 0 || specialReg.test(createUserDto.lastName) ||  (typeof createUserDto.lastName != "string")){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el apellido del usuario.'  }, HttpStatus.BAD_REQUEST)
        } 
        console.log(typeof createUserDto.Phone)
        if(!createUserDto.Phone  || createUserDto.Phone.length == 0 || specialRegnum.test(createUserDto.Phone) ||  (typeof createUserDto.Phone != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el telefono del usuario.'  }, HttpStatus.BAD_REQUEST)
        }  
        var request = require('request'); 
        var params = {
            'user-id': 'abraxasdf',
            'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
            'number': createUserDto.Phone.replace(/[^\d]/g, '')
        }; 
        request.post(
            'https://neutrinoapi.net/phone-validate',
            {form: params},
                function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var result = JSON.parse(body); 
                    if(result.valid){
                        this.usersService.createUser(createUserDto).then( user => {
                            response.status(200).json(user);
                        }
                        ).catch( () =>{
                            response.status(HttpStatus.FORBIDDEN).json({user: 'Error al crear el usuario'});
                        });
                    }else{    
                       throw new HttpException({status: HttpStatus.CONFLICT, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error el numero telefonico  no es valido.'  }, HttpStatus.CONFLICT)
                    }
                }
            }
        ); 

    }

    @Get()
    getAll(@Res() response, @Req() request) {
        this.usersService.getAll().then(usersList => {  
            response.status(200).json(usersList)
        }).catch( () => {
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error al cargar los usuario.'  }, HttpStatus.BAD_REQUEST)
        });
    }

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Res() response, @Param('id') idUser){
        if(!updateUserDto.name){ 
            throw new HttpException('Error al no enviar el nombre de usuario', HttpStatus.NOT_FOUND)
        }
        if(!updateUserDto.lastName){ 
            throw new HttpException('Error al no enviar el apellido de usuario', HttpStatus.NOT_FOUND)
        }
        if(!updateUserDto.Phone){ 
            throw new HttpException('Error al no enviar el telefono', HttpStatus.NOT_FOUND)
        }
        this.usersService.updateUser(idUser,updateUserDto ).then( user=> {
            response.status(200).json(user)
        } ).catch( () =>{
            response.status(HttpStatus.FORBIDDEN).json({user: 'Error al editar un usario'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idUser){
        this.usersService.deleteUser(idUser).then(res => {
            response.status(200).json(res);
        }).catch( ()=>{
            response.status(HttpStatus.FORBIDDEN).json({user: 'Error al eliminar un usario'});
        });
    }
    

}
