import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ description: '账号', example: '', required: true })
    @IsNotEmpty({ message: '用户id不能为空' })
    id: string;
}
