import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity'; 
import { CreateContactDto } from './dto/create-contact-dto';

@Injectable()
export class ContactsService {

    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ){}


    async getAll(): Promise<Contact[]>{
        return await this.contactRepository.find();
    }

    async findContactsfromUser(idUser: number): Promise<Contact[]> {
        return await this.contactRepository
            .createQueryBuilder()   
            .where("idUser = :id", { id: idUser })
            .getMany();
    }

    async compareContacts(idUser1: number,idUser2: number): Promise<Contact[]> {  
        const qurytext= 'SELECT * FROM contact WHERE contact.idUser = '+idUser1+' AND contact.Phone IN (SELECT contact.Phone FROM contact WHERE contact.idUser = '+idUser2+')'
        return await this.contactRepository.query(qurytext)
        
    }

    

    async createContact( contactNuevo: CreateContactDto): Promise<Contact>{
        const contacto = new Contact();
        contacto.idUser = contactNuevo.idUser;
        contacto.contactName = contactNuevo.contactName;
        contacto.Phone = contactNuevo.Phone;
        return this.contactRepository.save(contacto);
    }


    async createContact_1( contactNuevo: CreateContactDto){ 
        const contacto = new Contact();
        contacto.idUser = contactNuevo.idUser;
        contacto.contactName = contactNuevo.contactName;
        contacto.Phone = contactNuevo.Phone; 
        this.contactRepository.save(contacto);
    }
    

    async updateContact(id: number, contactActualizar: CreateContactDto): Promise<Contact>{
        const contactUpdate= await this.contactRepository.findOne(id);
        contactUpdate.idUser = contactActualizar.idUser;
        contactUpdate.contactName = contactActualizar.contactName;
        contactUpdate.Phone = contactActualizar.Phone;

        return  await this.contactRepository.save(contactUpdate)
    }



    async updateContacts(id: number, contactActualizar: CreateContactDto){
        try{
            const contactUpdate= await this.contactRepository.findOne(id); 
            contactUpdate.idUser = contactActualizar.idUser;
            contactUpdate.contactName = contactActualizar.contactName;
            contactUpdate.Phone = contactActualizar.Phone;
            this.contactRepository.save(contactUpdate)
        }catch (error) { 
            throw error
          }
    }
 


}
