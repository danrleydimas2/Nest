import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';


@Controller('courses')
export class CoursesController {
    //injetando service
    constructor(private readonly courseService:CoursesService){

    }

    @Get('express')
    findAllExpress(@Res() response) {
        return response.status(200).send('listagem de cursos') // utilizando o response do express
    }

    @Get()
    findAll(){
        return this.courseService.findAll()
    }


    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id)
    }
    // pegar dois parametros na rota
    @Get(':id/:name')
    findOneByTwoParams(@Param() params) {
        return `Curso com ID ${params.id} e com Name ${params.name}`
    }
    // descontruir parametros

    @Get(':id/:name/:idade')
    findOneByThreeParams(@Param('id') id: string, @Param('name') name: string, @Param('idade') idade: string) {
        return `Curso com ID ${id} , Name ${name} e com Idade ${idade} `
    }

    //trabalhando com method que trata dado pelo corpo da requisição
    // alterando o status code das respotas
    @HttpCode(201) //204 retorna nada que é bom para quando é uma rota para excluir
    @Post()
    create(@Body() CreateCourseDTO: CreateCourseDTO) {
        return this.courseService.create(CreateCourseDTO);
    }


    //atualizar dados
    //put para atualizar um conjuto de dados
    //patch para atualizar uma propriedade
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO) {
        return this.courseService.update(id,updateCourseDTO)
    }

    @Put(':id')
    updatePut (@Param ('id') id: string, @Body() updateCourseDTO: UpdateCourseDTO){
        return this.courseService.update(id,updateCourseDTO)
    }

    @HttpCode(HttpStatus.NO_CONTENT) //204 retorna nada que é bom para quando é uma rota para excluir
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.courseService.remove(id)
    }
}
