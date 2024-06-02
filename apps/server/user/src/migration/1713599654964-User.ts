import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1713599654964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase('user', true);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "first_name" character varying NOT NULL,
            "last_name" character varying NOT NULL,
            "is_active" boolean NOT NULL DEFAULT true,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "role" integer NOT NULL DEFAULT 1,
            CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('user');
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
