import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddTagsIdToCoursesTagsTable1730949553349 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('courses_tags_tags', new TableColumn({
            name: 'tagsId',
            type:'varchar',
            isNullable: true,
        })
    )
        await queryRunner.createForeignKey('courses_tags_tags', new TableForeignKey({
            name:'courses_tags_tags', //definindo nome foreign kkey
            columnNames:['tagsId'],// nome da coluna dentro de courses_tags
            referencedTableName: 'tags', //tabela que vai se relacionar com courses_tags
            referencedColumnNames: ['id'], //nome do campo da tabela que vai ser relacionado
            onDelete: 'SET NULL', // quando apagar um registro na tabela courses na tabela courses_tags todos os registros relacionado ao id do courses será colocado null 
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
