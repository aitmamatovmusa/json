import { MigrationInterface, QueryRunner } from "typeorm";

export class Quote1722887403254 implements MigrationInterface {
    name = 'Quote1722887403254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_7386dcd540e3822f0e9365dd911"`);
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "authorIdId" TO "authorId"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_36e9a62b8710aa5069bacd8c601" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_36e9a62b8710aa5069bacd8c601"`);
        await queryRunner.query(`ALTER TABLE "quote" RENAME COLUMN "authorId" TO "authorIdId"`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_7386dcd540e3822f0e9365dd911" FOREIGN KEY ("authorIdId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
