import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
    @Get()
    findAll(){
        return 'Listagem de cursos'
    }

    @Get(':id')
    findOne(@Param('id') id: string ){
        return `Curso com ID ${id}`
    }
    // pegar dois parametros na rota
    @Get(':id/:name')
    findOneByTwoParams(@Param() params){
        return `Curso com ID ${params.id} e com Name ${params.name}`
    }
    // descontruir parametros

    @Get(':id/:name/:idade')
    findOneByThreeParams(@Param('id') id:string , @Param('name') name:string, @Param('idade') idade:string ){
        return `Curso com ID ${id} , Name ${name} e com Idade ${idade} `
    }

}
