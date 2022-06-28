import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class vaccinationSite1656311154572 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vaccination_sites',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'ward_id',
            type: 'int',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'manager',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'number_table',
            type: 'int',
          },
          {
            name: 'create_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
          {
            name: 'delete_at',
            type: 'timestamp',
            isNullable: true,
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'vaccination_sites',
      new TableForeignKey({
        columnNames: ['ward_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wards',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vaccination_sites');
  }
}
