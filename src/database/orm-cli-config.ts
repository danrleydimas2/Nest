import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1730851875104 } from "src/migrations/1730851875104-CreateCoursesTable";
import { CreateTagsTable1730857171912 } from "src/migrations/1730857171912-CreateTagsTable";
import { CreateCoursesTagsTable1730858231111 } from "src/migrations/1730858231111-CreateCoursesTagsTable";
import { AddCoursesIdToCoursesTagsTable1730949058563 } from "src/migrations/1730949058563-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1730949553349 } from "src/migrations/1730949553349-AddTagsIdToCoursesTagsTable";
export const dataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false,
    migrations: [CreateCoursesTable1730851875104,CreateTagsTable1730857171912,
        CreateCoursesTagsTable1730858231111,AddCoursesIdToCoursesTagsTable1730949058563,AddTagsIdToCoursesTagsTable1730949553349]

})