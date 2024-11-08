import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';


@Module({

    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (ConfigService:ConfigService) => {
                return {
                    type: 'mysql',
                    host: ConfigService.get('DB_HOST'),
                    port: Number(ConfigService.get('DB_PORT')),
                    username: ConfigService.get('DB_USER'), // quando nao especifica o nome fica com o nome do from '' no dokerfile
                    password: ConfigService.get('DB_PASS'),
                    database: ConfigService.get('DB_NAME'),
                    entities: [Course,Tag],
                    synchronize: false, // se true criar tabelas automaticas para o banco de dados SOMENTE PARA AMBIENTE DESENVOLVIMENTO
                }
            },
            inject:[ConfigService]
        })
    ]
})
export class DatabaseModule {
}
