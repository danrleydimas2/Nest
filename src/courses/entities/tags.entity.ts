import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses.entity";
import { randomUUID } from "crypto";

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string

    @ManyToMany(() => Course, course => course.tags)
    courses: Course[]


    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return
        }
        this.id = randomUUID()
    }
}