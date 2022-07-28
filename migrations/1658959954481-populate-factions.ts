import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateFactions1658959954481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "faction" ("id", "name") VALUES (1, 'Rebel'), (2, 'Marine'), (3, 'World Noble')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "faction" WHERE "id" IN (1, 2, 3)`);
  }
}
