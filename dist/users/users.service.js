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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAll() {
        return await this.userRepository.find();
    }
    async createUser(userNuevo) {
        if (!userNuevo.name) {
            throw new common_1.HttpException('Error al no enviar el nombre de usuario', common_1.HttpStatus.NOT_FOUND);
        }
        if (!userNuevo.lastName) {
            throw new common_1.HttpException('Error al no enviar el apellido de usuario', common_1.HttpStatus.NOT_FOUND);
        }
        if (!userNuevo.Phone) {
            throw new common_1.HttpException('Error al no enviar el telefono', common_1.HttpStatus.NOT_FOUND);
        }
        const nuevo = new user_entity_1.User();
        nuevo.name = userNuevo.name;
        nuevo.lastName = userNuevo.lastName;
        nuevo.Phone = userNuevo.Phone;
        return this.userRepository.save(nuevo);
    }
    async updateUser(iduser, userActualizar) {
        const userUpdate = await this.userRepository.findOne(iduser);
        userUpdate.name = userActualizar.name;
        userUpdate.lastName = userActualizar.lastName;
        userUpdate.Phone = userActualizar.Phone;
        return await this.userRepository.save(userUpdate);
    }
    async deleteUser(idUser) {
        return await this.userRepository.delete(idUser);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map