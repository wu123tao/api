import { Module } from '@nestjs/common';
import { LabelValueService } from './label-value.service';
import { LabelValueController } from './label-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, Organization])],
    controllers: [LabelValueController],
    providers: [LabelValueService],
})
export class LabelValueModule {}
