import { Module } from '@nestjs/common';
import { LabelValueService } from './label-value.service';
import { LabelValueController } from './label-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/modules/role/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, User, Organization])],
    controllers: [LabelValueController],
    providers: [LabelValueService],
})
export class LabelValueModule {}
