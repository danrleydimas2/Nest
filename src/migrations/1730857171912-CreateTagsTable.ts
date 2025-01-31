import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTagsTable1730857171912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'tags',
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
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tags')
    }

}
