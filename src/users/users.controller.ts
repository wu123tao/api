import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('list')
    findAll(@Query() userDto: UserDto) {
        return this.usersService.findList(userDto);
    }

    @Post('save')
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('edit')
    edit(@Body() updateRoleDto: UpdateUserDto) {
        return this.usersService.update(updateRoleDto);
    }

    @Post('delete')
    remove(@Body() deleteRoleDto: DeleteUserDto) {
        return this.usersService.remove(deleteRoleDto);
    }

    @Get('detail')
    detail(@Query('id') id: string) {
        return this.usersService.findOne(id);
    }
}
