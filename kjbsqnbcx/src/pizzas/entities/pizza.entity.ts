import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pizza {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({length:200})
    name!: string;

    @Column()
    price!: number;


}

