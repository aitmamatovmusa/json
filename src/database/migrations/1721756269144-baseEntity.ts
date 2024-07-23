import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseEntity1721756269144 implements MigrationInterface {
    name = 'BaseEntity1721756269144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "account" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "account_email_key"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "fullname" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "fullname" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "account_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "account" ADD "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
    }

}
