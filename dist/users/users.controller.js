"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user-dto");
const users_service_1 = require("./users.service");
const specialReg = new RegExp(/[0-9$-/:-?{-~!"^_`\[\]]/);
const specialRegnum = new RegExp(/[a-zA-Z$-/:-?{-~!"^_`\[\]]/);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto, response, request) {

        let usersservice = this.usersService;
        if (!createUserDto.name || createUserDto.name.length == 0 || specialReg.test(createUserDto.name) || (typeof createUserDto.name != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el nombre usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!createUserDto.lastName || createUserDto.lastName.length == 0 || specialReg.test(createUserDto.lastName) || (typeof createUserDto.lastName != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el apellido del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!createUserDto.Phone || createUserDto.Phone.length == 0 || specialRegnum.test(createUserDto.Phone) || (typeof createUserDto.Phone != "string")) {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error en el telefono del usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        }
        var request = require('request');
        var params = {
            'user-id': 'abraxasdf',
            'api-key': 'Irud5B2GdKdroUGQHMLyszTgaE1TJTmqiU1wxbfauHLn5Yla',
            'number': createUserDto.Phone.replace(/[^\d]/g, '')
        };
        request.post('https://neutrinoapi.net/phone-validate', { form: params }, function(error, res, body) {
            if (!error && res.statusCode == 200) {
                var result = JSON.parse(body); //Aqui se puede salvar si se requiere la información extra de la validación del teléfono.
                if (result.valid) {
                    usersservice.createUser(createUserDto).then(user => {
                        response.status(200).json(user);
                    }).catch(() => {
                        response.status(common_1.HttpStatus.FORBIDDEN).json({ user: 'Error al crear el usuario' });
                    });
                } else {
                    throw new common_1.HttpException({ status: common_1.HttpStatus.CONFLICT, path: request.url, timestamp: Date().toLocaleString(), message: 'Error el numero telefonico  no es valido.' }, common_1.HttpStatus.CONFLICT);
                }
            }
        });
    }
    getAll(response, request) {
        this.usersService.getAll().then(usersList => {
            response.status(200).json(usersList);
        }).catch(() => {
            throw new common_1.HttpException({ status: common_1.HttpStatus.BAD_REQUEST, path: request.url, timestamp: Date().toLocaleString(), message: 'Error al cargar los usuario.' }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    update(updateUserDto, response, idUser) {
        if (!updateUserDto.name) {
            throw new common_1.HttpException('Error al no enviar el nombre de usuario', common_1.HttpStatus.NOT_FOUND);
        }
        if (!updateUserDto.lastName) {
            throw new common_1.HttpException('Error al no enviar el apellido de usuario', common_1.HttpStatus.NOT_FOUND);
        }
        if (!updateUserDto.Phone) {
            throw new common_1.HttpException('Error al no enviar el telefono', common_1.HttpStatus.NOT_FOUND);
        }
        this.usersService.updateUser(idUser, updateUserDto).then(user => {
            response.status(200).json(user);
        }).catch(() => {
            response.status(common_1.HttpStatus.FORBIDDEN).json({ user: 'Error al editar un usario' });
        });
    }
    delete(response, idUser) {
        this.usersService.deleteUser(idUser).then(res => {
            response.status(200).json(res);
        }).catch(() => {
            response.status(common_1.HttpStatus.FORBIDDEN).json({ user: 'Error al eliminar un usario' });
        });
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()), __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAll", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Res()), __param(2, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map