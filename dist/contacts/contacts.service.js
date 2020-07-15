"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./entities/contact.entity");
let ContactsService = class ContactsService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async getAll() {
        return await this.contactRepository.find();
    }
    async findContactsfromUser(idUser) {
        return await this.contactRepository
            .createQueryBuilder()
            .where("idUser = :id", { id: idUser })
            .getMany();
    }
    async compareContacts(idUser1, idUser2) {
        const qurytext = 'SELECT * FROM contact WHERE contact.idUser = ' + idUser1 + ' AND contact.Phone IN (SELECT contact.Phone FROM contact WHERE contact.idUser = ' + idUser2 + ')';
        return await this.contactRepository.query(qurytext);
    }
    async createContact(contactNuevo) {
        const contacto = new contact_entity_1.Contact();
        contacto.idUser = contactNuevo.idUser;
        contacto.contactName = contactNuevo.contactName;
        contacto.Phone = contactNuevo.Phone;
        return this.contactRepository.save(contacto);
    }
    async createContact_1(contactNuevo) {
        const contacto = new contact_entity_1.Contact();
        contacto.idUser = contactNuevo.idUser;
        contacto.contactName = contactNuevo.contactName;
        contacto.Phone = contactNuevo.Phone;
        this.contactRepository.save(contacto);
    }
    async updateContact(id, contactActualizar) {
        const contactUpdate = await this.contactRepository.findOne(id);
        contactUpdate.idUser = contactActualizar.idUser;
        contactUpdate.contactName = contactActualizar.contactName;
        contactUpdate.Phone = contactActualizar.Phone;
        return await this.contactRepository.save(contactUpdate);
    }
    async updateContacts(id, contactActualizar) {
        try {
            const contactUpdate = await this.contactRepository.findOne(id);
            contactUpdate.idUser = contactActualizar.idUser;
            contactUpdate.contactName = contactActualizar.contactName;
            contactUpdate.Phone = contactActualizar.Phone;
            this.contactRepository.save(contactUpdate);
        }
        catch (error) {
            throw error;
        }
    }
};
ContactsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactsService);
exports.ContactsService = ContactsService;
//# sourceMappingURL=contacts.service.js.map