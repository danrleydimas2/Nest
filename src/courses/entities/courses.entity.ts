import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"
import { randomUUID } from "crypto"

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    name: string
    @Column()
    description: string
    @JoinTable() //deve colocar jointable para definir a entidade principal
    @ManyToMany(() => Tag, tag => tag.courses, {
        cascade: true
    }) // parametro 1 alvo que sera uma entidade que vc queira manipular e 2 parametro é a propriedade
    // 3 é o cascade que quer dizer que qualquer dado da entidade tag sera inserido na table tags e sera relacionado com respectivo curso put/post/patch
    tags: Tag[]
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @BeforeInsert()
    generatedId() {
        if (this.id) {
            return
        }
        this.id = randomUUID()
    }
}