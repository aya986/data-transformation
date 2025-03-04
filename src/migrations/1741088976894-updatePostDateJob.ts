import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePostDateJob1741088976894 implements MigrationInterface {
    name = 'UpdatePostDateJob1741088976894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "datePosted"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "datePosted" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "datePosted"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "datePosted" character varying NOT NULL`);
    }

}
