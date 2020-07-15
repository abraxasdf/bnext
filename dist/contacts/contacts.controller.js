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
exports.ContactsController = void 0;
const common_1 = require("@nestjs/common");
const create_contact_dto_1 = require("./dto/create-contact-dto");
const contacts_service_1 = require("./contacts.service");
const specialReg = new RegExp(/[0-9$-/:-?{-~!"^_`\[\]]/);
const specialRegnum = new RegExp(/[a-zA-Z$-/:-?{-~!"^_`\[\]]/);
let ContactsController = class ContactsController {
    constructor(contactsService) {
        this.contactsService = contactsService;
    }
    create(createContactoDto, response, req) {
        let contactservice = this.contactsService;
        if (!req.body.contactName || req.body.contactName.length == 0 || specialReg.test(req.body.contactName) || (typeof req.body.contactName != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el nombre del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!req.body.idUser || specialRegnum.test(req.body.idUser) || (typeof req.body.idUser != "number")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!req.body.Phone || req.body.Phone.length == 0 || specialRegnum.test(req.body.Phone) || (typeof req.body.Phone != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el teléfono del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        var request = require('request');
        var params = {
            'user-id': 'abraxasdf',
            'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
            'number': createContactoDto.Phone.replace(/[^\d]/g, '')
        };
        request.post('https://neutrinoapi.net/phone-validate', { form: params }, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                var result = JSON.parse(body);
                if (result.valid) {
                    contactservice.createContact(createContactoDto).then(contacto => {
                        response.status(200).json(contacto);
                    }).catch(() => {
                        response.status(common_1.HttpStatus.FORBIDDEN).json({ contacto: 'Error al editar un contacto' });
                    });
                }
                else {
                    response.status(common_1.HttpStatus.FORBIDDEN).json({
                        "status": "error",
                        "message": "Error  telefono(" + createContactoDto.Phone + ") no valido."
                    }).send();
                }
            }
        });
    }
    newcontacts(createContactoDto, response, idUser, req) {
        let contactservice = this.contactsService;
        if (req.body.length != undefined) {
            let indexarray = 0;
            var array_obj = [];
            req.body.forEach(element => {
                indexarray++;
                if (!element.contactName || element.contactName.length == 0 || (typeof element.contactName != "string")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el nombre del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!element.idUser || specialRegnum.test(element.idUser) || (typeof element.idUser != "number")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!element.Phone || element.Phone.length == 0 || specialRegnum.test(element.Phone) || (typeof element.Phone != "string")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el telefono del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                this.contactsService.createContact_1(element).then(contacto => {
                    if (indexarray === req.body.length) {
                        response.status(200).json({ message: 'Contactos agregados corréctamente.' });
                    }
                }).catch(() => {
                    response.status(common_1.HttpStatus.FORBIDDEN).json({ contacto: 'Error al crear el contacto' });
                });
            });
        }
        else {
            if (!createContactoDto.contactName || createContactoDto.contactName.length == 0 || specialReg.test(createContactoDto.contactName) || (typeof createContactoDto.contactName != "string")) {
                throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el nombre del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!idUser || specialRegnum.test(idUser) || (typeof idUser != "string")) {
                throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!createContactoDto.Phone || createContactoDto.Phone.length == 0 || specialRegnum.test(createContactoDto.Phone) || (typeof createContactoDto.Phone != "string")) {
                throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el telefono del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
            }
            var request = require('request');
            var params = {
                'user-id': 'abraxasdf',
                'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
                'number': createContactoDto.Phone.replace(/[^\d]/g, '')
            };
            request.post('https://neutrinoapi.net/phone-validate', { form: params }, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var result = JSON.parse(body);
                    if (result.valid) {
                        contactservice.createContact(createContactoDto).then(contacto => {
                            response.status(200).json(contacto);
                        }).catch(() => {
                            response.status(common_1.HttpStatus.FORBIDDEN).json({ contacto: 'Error al editar un contacto' });
                        });
                    }
                    else {
                        response.status(common_1.HttpStatus.FORBIDDEN).json({
                            "status": "error",
                            "message": "Error  telefono(" + createContactoDto.Phone + ") no valido."
                        }).send();
                    }
                }
            });
        }
    }
    findContactsfromUser(response, idUser, request) {
        if (!idUser || specialRegnum.test(idUser) || (typeof idUser != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        this.contactsService.findContactsfromUser(parseInt(idUser)).then(contactsList => {
            response.status(200).json(contactsList);
        }).catch(() => {
            throw new common_1.HttpException({ status: common_1.HttpStatus.FORBIDDEN, path: request.url, timestamp: Date().toLocaleString(), message: 'Error al listar los contactos.' }, common_1.HttpStatus.FORBIDDEN);
        });
    }
    compareContacts(response, idUser1, idUser2, request) {
        if (!idUser1 || idUser1.length == 0 || specialRegnum.test(idUser1) || (typeof idUser1 != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!idUser2 || idUser2.length == 0 || specialRegnum.test(idUser2) || (typeof idUser2 != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        this.contactsService.compareContacts(parseInt(idUser1), parseInt(idUser2)).then(contactsList => {
            response.status(200).json(contactsList);
        }).catch(() => {
            throw new common_1.HttpException({ status: common_1.HttpStatus.FORBIDDEN, path: request.url, timestamp: Date().toLocaleString(), message: `Error al listar todos los contactos del Iduser:${idUser1} y del IdUser:${idUser2}` }, common_1.HttpStatus.FORBIDDEN);
        });
    }
    update(updateContactoDto, response, idContact, req) {
        let contactservice = this.contactsService;
        if (!idContact || idContact.length == 0 || specialRegnum.test(idContact) || (typeof idContact != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el id del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (req.body.length > 0) {
            let indexarray = 0;
            var array_obj = [];
            req.body.forEach(element => {
                indexarray++;
                if (!element.id || specialRegnum.test(element.id) || (typeof element.id != "number")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el id del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!element.contactName || element.contactName.length == 0 || specialReg.test(element.contactName) || (typeof element.contactName != "string")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el nombre del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                if (!element.Phone || element.Phone.length == 0 || specialRegnum.test(element.Phone) || (typeof element.Phone != "string")) {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: req.url, timestamp: Date().toLocaleString(), message: 'Error en el teléfono del contacto.' }, common_1.HttpStatus.BAD_REQUEST);
                }
                contactservice.updateContacts(parseInt(element.id), element).then(contacto => {
                    if (indexarray === req.body.length) {
                        response.status(200).json({ message: 'Contactos editatos corréctamente.' });
                    }
                }).catch(() => { });
            });
        }
        else {
            if (!idContact) {
                throw new common_1.HttpException('Error al no enviar el ID de contacto', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!req.body.contactName) {
                throw new common_1.HttpException('Error al no enviar el Nombre de contacto', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!req.body.Phone) {
                throw new common_1.HttpException('Error al no enviar el telefono', common_1.HttpStatus.BAD_REQUEST);
            }
            var request = require('request');
            var params = {
                'user-id': 'abraxasdf',
                'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
                'number': updateContactoDto.Phone.replace(/[^\d]/g, '')
            };
            request.post('https://neutrinoapi.net/phone-validate', { form: params }, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    var result = JSON.parse(body);
                    if (result.valid) {
                        contactservice.updateContact(parseInt(idContact), updateContactoDto).then(contacto => {
                            response.status(common_1.HttpStatus.OK).json({ message: 'Contactos editatos corréctamente.' });
                        }).catch(() => {
                            response.status(common_1.HttpStatus.FORBIDDEN).json({ contacto: 'Error al editar un contacto' });
                        });
                    }
                    else {
                        response.status(common_1.HttpStatus.FORBIDDEN).json({
                            "status": "error",
                            "message": "Error  telefono(" + updateContactoDto.Phone + ") no valido."
                        }).send();
                    }
                }
            });
        }
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "create", null);
__decorate([
    common_1.Post(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "newcontacts", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "findContactsfromUser", null);
__decorate([
    common_1.Get(':idUser1/:idUser2'),
    __param(0, common_1.Res()), __param(1, common_1.Param('idUser1')), __param(2, common_1.Param('idUser2')), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "compareContacts", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')), __param(3, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], ContactsController.prototype, "update", null);
ContactsController = __decorate([
    common_1.Controller('contacts'),
    __metadata("design:paramtypes", [contacts_service_1.ContactsService])
], ContactsController);
exports.ContactsController = ContactsController;
//# sourceMappingURL=contacts.controller.js.map