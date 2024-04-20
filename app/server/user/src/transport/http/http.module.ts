import { Module } from '@nestjs/common';
import { UserController } from "./controller/user/user.controller";
import { HealthController } from "./controller/health/health.controller";
import { UserService } from "../../service/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, HealthController],
  providers: [UserService],
})
export class HttpModule {}
