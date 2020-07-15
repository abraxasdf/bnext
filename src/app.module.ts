import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsService } from './contacts/contacts.service';
import { Contact } from './contacts/entities/contact.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'whiteboard.com.mx',
      //host: 'localhost',
      port: 3306,
      username: 'root_abra12',
      password: 'root_abra12',
      database: 'bnext',
      entities: [__dirname + '/**/*.entity{.ts,.js} '],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User,Contact]),
  ],
  controllers: [AppController, UsersController, ContactsController],
  providers: [AppService, UsersService, ContactsService],
})
export class AppModule {}
