import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact-dto';
export declare class ContactsService {
    private readonly contactRepository;
    constructor(contactRepository: Repository<Contact>);
    getAll(): Promise<Contact[]>;
    findContactsfromUser(idUser: number): Promise<Contact[]>;
    compareContacts(idUser1: number, idUser2: number): Promise<Contact[]>;
    createContact(contactNuevo: CreateContactDto): Promise<Contact>;
    createContact_1(contactNuevo: CreateContactDto): Promise<void>;
    updateContact(id: number, contactActualizar: CreateContactDto): Promise<Contact>;
    updateContacts(id: number, contactActualizar: CreateContactDto): Promise<void>;
}
