import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from 'src/common/const/jwt.const';
import { Role } from 'src/modules/role/entities/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: 6 * 60 },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
