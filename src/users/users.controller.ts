import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { omit } from 'lodash';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @UseGuards(AuthGuard('jwt'))
    @Get('list')
    @ApiOperation({ summary: '用户列表' })
    findAll(@Query() userDto: UserDto) {
        const searchParams = { ...omit(userDto, ['page', 'limit']) } as UserDto;
        const pageParams = {
            limit: userDto.limit ?? 3,
            page: userDto.page ?? 1,
        };
        return this.usersService.findList(searchParams, pageParams);
    }

    @Post('save')
    @ApiOperation({ summary: '添加用户' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑用户' })
    edit(@Body() updateRoleDto: UpdateUserDto) {
        return this.usersService.update(updateRoleDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '用户用户' })
    remove(@Body() deleteRoleDto: DeleteUserDto) {
        return this.usersService.remove(deleteRoleDto);
    }

    @Get('detail')
    @ApiOperation({ summary: '用户详情' })
    detail(@Query('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }
}
