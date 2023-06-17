import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/users/db/user.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
