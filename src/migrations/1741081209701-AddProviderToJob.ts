import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProviderToJob1741081209701 implements MigrationInterface {
    name = 'AddProviderToJob1741081209701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "provider" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "provider"`);
    }

}
