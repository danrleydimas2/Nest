import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1730851875104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'courses',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,

                },
                {
                    name: 'name',
                    type: 'varchar',
                }
                ,
                {
                    name: 'description',
                    type: 'varchar',
                }
                ,
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses')
    }

}
