import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Contact {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idUser: number;

    @Column()
    contactName: string;

    @Column()
    Phone: string;


}
