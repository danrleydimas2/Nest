import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) { }


    async findAll() {
        return await this.courseRepository.find()
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({
            where: { id }
        })
        if (!course) {
            throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND)
        }
        return course
    }

    async create(createCourseDTO: any) {
        const course = this.courseRepository.create(createCourseDTO) // nao é uma promise por isso nao precisa de await
        return this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: any) {
        const course = await this.courseRepository.preload({
            ...updateCourseDTO,
            id
        }) //preload ele ja faz a  busca e cria o objt
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
}
