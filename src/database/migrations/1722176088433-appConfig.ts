import { MigrationInterface, QueryRunner } from "typeorm";

export class AppConfig1722176088433 implements MigrationInterface {
    name = 'AppConfig1722176088433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_ccdbb6f00e8113d8953476a507b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app_config"`);
    }

}
