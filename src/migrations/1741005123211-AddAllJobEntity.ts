import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAllJobEntity1741005123211 implements MigrationInterface {
    name = 'AddAllJobEntity1741005123211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "title" character varying(150) NOT NULL, CONSTRAINT "UQ_5b1131c92af934e7c2a1322ec87" UNIQUE ("title"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "industry" character varying, "website" character varying, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "jobId" character varying NOT NULL, "position" character varying NOT NULL, "isRemote" boolean, "type" character varying, "location" character varying NOT NULL, "min" integer NOT NULL, "max" integer NOT NULL, "currency" character varying NOT NULL, "experienceLevel" character varying, "education" character varying, "datePosted" character varying NOT NULL, "companyId" integer, CONSTRAINT "UQ_1302c6cddf76342df00e55d2e6d" UNIQUE ("jobId"), CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_skills_skill" ("jobId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_27773e917c7fc5b92dee508ed56" PRIMARY KEY ("jobId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7f0160506793da667b04476540" ON "job_skills_skill" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ae25ea346c558d8cc5bcba6ff6" ON "job_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_skills_skill" ADD CONSTRAINT "FK_7f0160506793da667b044765400" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_skills_skill" ADD CONSTRAINT "FK_ae25ea346c558d8cc5bcba6ff6f" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_skills_skill" DROP CONSTRAINT "FK_ae25ea346c558d8cc5bcba6ff6f"`);
        await queryRunner.query(`ALTER TABLE "job_skills_skill" DROP CONSTRAINT "FK_7f0160506793da667b044765400"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae25ea346c558d8cc5bcba6ff6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f0160506793da667b04476540"`);
        await queryRunner.query(`DROP TABLE "job_skills_skill"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
