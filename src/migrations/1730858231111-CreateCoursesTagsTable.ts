import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTagsTable1730858231111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses_tags_tags',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,

                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses_tags')
    }

}
