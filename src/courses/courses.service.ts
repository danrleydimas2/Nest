import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Console } from 'console';


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository:Repository<Tag>
    ) { }


    async findAll() {
        return await this.courseRepository.find({
            relations:['tags'] //para trazer os dados de outra tabela com relação
        })
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations:['tags'] 
        })
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return course
    }

    async create(createCourseDTO: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByname(name))
        )
        const course = this.courseRepository.create({
            ...createCourseDTO,
            tags
        }) // nao é uma promise por isso nao precisa de await
        return this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: UpdateCourseDTO) {
        const tags = updateCourseDTO.tags && (await Promise.all(updateCourseDTO.tags.map(name=> this.preloadTagByname(name))))

        const course =  await this.courseRepository.preload({
            ...updateCourseDTO,
            id,
            tags
        })
        console.log(course)
         //preload ele ja faz a  busca e cria o objt
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return this.courseRepository.save(course)
    }

    async remove(id: number) {
        const course = await this.courseRepository.findOne({
            where: { id },
        })
        if (!course) {
            throw new NotFoundException(`Course ID ${id} not found`)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByname(name:string) :Promise <Tag>{
        const tag = await this.tagRepository.findOne({where:{name}})
        if(tag){
            return tag
        }
        return this.tagRepository.create({name})
    }
}
