import { MigrationInterface, QueryRunner } from "typeorm";

export class Config1722763091078 implements MigrationInterface {
    name = 'Config1722763091078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "config" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying NOT NULL, "value" character varying NOT NULL, CONSTRAINT "PK_d0ee79a681413d50b0a4f98cf7b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "config"`);
    }

}
