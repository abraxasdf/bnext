import { CreateContactDto } from './dto/create-contact-dto';
import { ContactsService } from './contacts.service';
export declare class ContactsController {
    private contactsService;
    constructor(contactsService: ContactsService);
    create(createContactoDto: CreateContactDto, response: any, req: any): void;
    newcontacts(createContactoDto: CreateContactDto, response: any, idUser: any, req: any): void;
    findContactsfromUser(response: any, idUser: any, request: any): void;
    compareContacts(response: any, idUser1: any, idUser2: any, request: any): void;
    update(updateContactoDto: CreateContactDto, response: any, idContact: any, req: any): void;
}
