import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"
import { join } from "path"

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @JoinTable() //deve colocar jointable para definir a entidade principal
    @ManyToMany(() => Tag, tag => tag.courses, {
        cascade:true
    }) // parametro 1 alvo que sera uma entidade que vc queira manipular e 2 parametro é a propriedade
                                                // 3 é o cascade que quer dizer que qualquer dado da entidade tag sera inserido na table tags e sera relacionado com respectivo curso put/post/patch
    tags: Tag[]
}