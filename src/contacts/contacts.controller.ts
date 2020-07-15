import { Controller, Post, Body, Get, Put, Res, HttpStatus, Param,Req, Header, HttpException } from '@nestjs/common'; 
import { CreateContactDto } from './dto/create-contact-dto';
import { ContactsService } from './contacts.service';  


const specialReg = new RegExp(/[0-9$-/:-?{-~!"^_`\[\]]/);
const specialRegnum = new RegExp(/[a-zA-Z$-/:-?{-~!"^_`\[\]]/);

@Controller('contacts')
export class ContactsController {
    constructor(private contactsService: ContactsService){

    }


    @Post()
    create(@Body() createContactoDto: CreateContactDto, @Res() response,@Req() req){ 
        if(!req.body.contactName  || req.body.contactName.length == 0 || specialReg.test(req.body.contactName)  ||  (typeof req.body.contactName != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el nombre del contacto.'  }, HttpStatus.BAD_REQUEST)
        }
        if(!req.body.idUser  || specialRegnum.test(req.body.idUser) ||  (typeof req.body.idUser != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
        }  
        if(!req.body.Phone  || req.body.Phone.length == 0 || specialRegnum.test(req.body.Phone) ||  (typeof req.body.Phone != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el telefono del contacto.'  }, HttpStatus.BAD_REQUEST)
        }
        this.contactsService.createContact(createContactoDto).then( contacto => {
            response.status(200).json(contacto);
        }
        ).catch( () =>{
            response.status(HttpStatus.FORBIDDEN).json({contacto: 'Error al crear el contacto'});
        });
    }

    @Post(':id') 
    newcontacts(@Body() createContactoDto: CreateContactDto, @Res() response, @Param('id') idUser,@Req() req){    
        let contactservice = this.contactsService;
        if (req.body.length!= undefined){ 
            
            var array_obj = [];
           req.body.forEach(element => { 
                if(!element.contactName  || element.contactName.length == 0 || specialReg.test(element.contactName) ||  (typeof element.contactName != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el nombre del contacto.'  }, HttpStatus.BAD_REQUEST)
                }
                if(!element.idUser  || specialRegnum.test(element.idUser) ||  (typeof element.idUser != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
                }  
                if(!element.Phone  || element.Phone.length == 0 || specialRegnum.test(element.Phone) ||  (typeof element.Phone != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el telefono del contacto.'  }, HttpStatus.BAD_REQUEST)
                } 
                
                this.contactsService.createContact_1(element).then( contacto => { 
                }
                ).catch( () =>{
                    response.status(HttpStatus.FORBIDDEN).json({contacto: 'Error al crear el contacto'});
                });
           }); 
           response.status(HttpStatus.OK).json(array_obj) 

        }else{
 
            if(!createContactoDto.contactName  || createContactoDto.contactName.length == 0 || specialReg.test(createContactoDto.contactName) ||  (typeof createContactoDto.contactName != "string") ){ 
                throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el nombre del contacto.'  }, HttpStatus.BAD_REQUEST)
            }
            if(!idUser  || specialRegnum.test(idUser) ||  (typeof idUser != "string") ){ 
                throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
            }  
            if(!createContactoDto.Phone  || createContactoDto.Phone.length == 0 || specialRegnum.test(createContactoDto.Phone) ||  (typeof createContactoDto.Phone != "string") ){ 
                throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el telefono del contacto.'  }, HttpStatus.BAD_REQUEST)
            } 


            var request = require('request'); 
            var params = {
                'user-id': 'abraxasdf',
                'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
                'number': createContactoDto.Phone.replace(/[^\d]/g, '')
            };
            request.post(
                'https://neutrinoapi.net/phone-validate',
                {form: params},
                function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var result = JSON.parse(body);
                    console.log(result); 
                    if(result.valid){
                        contactservice.createContact(createContactoDto).then( contacto => {
                            response.status(200).json(contacto);
                        }).catch( () =>{
                            response.status(HttpStatus.FORBIDDEN).json({contacto: 'Error al editar un contacto'});
                        }); 
                    }else{    
                        response.status(HttpStatus.FORBIDDEN).json({
                            "status": "error",
                            "message": "Error  telefono("+createContactoDto.Phone+") no valido."}).send()           
                    }
                }
                }
            );
 
            
        }
    }

    @Get(':id')
    findContactsfromUser(@Res() response, @Param('id') idUser, @Req() request) { 
        if(!idUser  || specialRegnum.test(idUser) ||  (typeof idUser != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
        }   
        this.contactsService.findContactsfromUser(parseInt(idUser)).then(contactsList => {  
            response.status(200).json(contactsList)
        }).catch( () => {
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error al listar los contactos .'  }, HttpStatus.BAD_REQUEST)
        });
    }


    @Get(':idUser1/:idUser2')
    compareContacts(@Res() response, @Param('idUser1') idUser1, @Param('idUser2') idUser2, @Req() request) {

        if(!idUser1  || idUser1.length == 0 || specialRegnum.test(idUser1) ||  (typeof idUser1 != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
        }   

        if(!idUser2  || idUser2.length == 0 || specialRegnum.test(idUser2) ||  (typeof idUser2 != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
        }   

        this.contactsService.compareContacts(parseInt(idUser1),parseInt(idUser2)).then(contactsList => {  
            response.status(200).json(contactsList)
        }).catch( () => {
            throw new HttpException({status: HttpStatus.FORBIDDEN, path: request.url, timestamp:  Date().toLocaleString(), message:  `Error al listar todos los contactos del Iduser:${idUser1} y del IdUser:${idUser2}`   }, HttpStatus.FORBIDDEN)
        });
    }

    @Put(':id')
    update(@Body() updateContactoDto: CreateContactDto, @Res() response, @Param('id') idContact,@Req() req){
        let contactservice = this.contactsService;
        
        if(!idContact  || idContact.length == 0 || specialRegnum.test(idContact) ||  (typeof idContact != "string") ){ 
            throw new HttpException({status: HttpStatus.BAD_REQUEST, path: request.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del usuario.'  }, HttpStatus.BAD_REQUEST)
        }   

        if (req.body.length>0){ 
            let indexarray=0;
            var array_obj = [];
            req.body.forEach(element => {  

                indexarray++;
                console.log('indexarray:'+indexarray)
                console.log('req.body.length:'+req.body.length)

                if(!element.id  || specialRegnum.test(element.id) ||  (typeof element.id != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el id del contacto.'  }, HttpStatus.BAD_REQUEST)
                }

                if(!element.contactName  || element.contactName.length == 0 || specialReg.test(element.contactName) ||  (typeof element.contactName != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el nombre del contacto.'  }, HttpStatus.BAD_REQUEST)
                }

                if(!element.Phone  || element.Phone.length == 0 || specialRegnum.test(element.Phone) ||  (typeof element.Phone != "string") ){ 
                    throw new HttpException({status: HttpStatus.BAD_REQUEST, path: req.url, timestamp:  Date().toLocaleString(), message: 'Error en el numero de telefono.'  }, HttpStatus.BAD_REQUEST)
                }   
                 
                contactservice.updateContacts(parseInt(element.id),element).then( contacto => {  
                    if(indexarray===req.body.length){ 
                        response.status(200).json(array_obj) 
                    }
                }
                ).catch( () =>{});
                
                
             }); 
        }else{   
            if(!idContact){ 
                throw new HttpException('Error al no enviar el ID de contacto', HttpStatus.NOT_FOUND)
            }
            if(!req.body.contactName){ 
                throw new HttpException('Error al no enviar el Nombre de contacto', HttpStatus.NOT_FOUND)
            }
            if(!req.body.Phone){ 
                throw new HttpException('Error al no enviar el telefono', HttpStatus.NOT_FOUND)
            }

            var request = require('request'); 
            var params = {
                'user-id': 'abraxasdf',
                'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
                'number': updateContactoDto.Phone.replace(/[^\d]/g, '')
            };
            request.post(
                'https://neutrinoapi.net/phone-validate',
                {form: params},
                function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var result = JSON.parse(body);
                    console.log(result); 
                    if(result.valid){
                        contactservice.updateContact(parseInt(idContact),updateContactoDto ).then( contacto=> {
                            response.status(HttpStatus.OK).json(contacto)
                        } ).catch( () =>{
                            response.status(HttpStatus.FORBIDDEN).json({contacto: 'Error al editar un contacto'});
                        }); 
                    }else{    
                        response.status(HttpStatus.FORBIDDEN).json({
                            "status": "error",
                            "message": "Error  telefono("+updateContactoDto.Phone+") no valido."}).send()           
                    }
                }
                }
            );
            
        } 
    }
 


}
