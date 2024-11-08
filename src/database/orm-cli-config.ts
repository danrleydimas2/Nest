import 'dotenv/config'
import { DataSource, DataSourceOptions } from "typeorm";
import { CreateCoursesTable1730851875104 } from "src/migrations/1730851875104-CreateCoursesTable";
import { CreateTagsTable1730857171912 } from "src/migrations/1730857171912-CreateTagsTable";
import { CreateCoursesTagsTable1730858231111 } from "src/migrations/1730858231111-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1730949058563 } from "src/migrations/1730949058563-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1730949553349 } from "src/migrations/1730949553349-AddTagsIdToCoursesTagsTable";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from "src/courses/entities/tags.entity";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER, // quando nao especifica o nome fica com o nome do from '' no dokerfile
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course,Tag],
    synchronize: false, // se true criar tabelas automaticas para o banco de dados SOMENTE PARA AMBIENTE DESENVOLVIMENTO

}

export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1730851875104,CreateTagsTable1730857171912,
        CreateCoursesTagsTable1730858231111,AddCoursesIdToCoursesTagsTable1730949058563,AddTagsIdToCoursesTagsTable1730949553349]

})