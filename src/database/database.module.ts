import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root', // quando nao especifica o nome fica com o nome do from '' no dokerfile
    password: 'docker',
    database: 'devtraining',
    entities: [Course],
    synchronize: true, //criar tabelas automaticas para o banco de dados

}
@Module({

    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return {
                    ...dataSourceOptions
                }
            }
        })
    ]
})
export class DatabaseModule {
}
