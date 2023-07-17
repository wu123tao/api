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
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserVo } from './vo/user.vo';
import {
    OKResponse,
    OKResponseData,
    PageResponse,
} from 'src/common/decorators/response.decorator';
import { LoginVo } from './vo/login.vo';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @UseGuards(AuthGuard('jwt'))
    @Get('list')
    @ApiOperation({ summary: '用户列表' })
    @PageResponse(UserVo)
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
    @OKResponse()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Post('edit')
    @ApiOperation({ summary: '编辑用户' })
    @OKResponse()
    edit(@Body() updateRoleDto: UpdateUserDto) {
        return this.usersService.update(updateRoleDto);
    }

    @Post('delete')
    @ApiOperation({ summary: '删除用户' })
    @OKResponse()
    remove(@Body() deleteRoleDto: DeleteUserDto) {
        return this.usersService.remove(deleteRoleDto);
    }

    @Get('detail')
    @ApiOperation({ summary: '用户详情' })
    @OKResponseData(UserVo)
    detail(@Query('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post('resetPassword')
    @ApiOperation({ summary: '重置密码' })
    @OKResponse()
    resetPassword(@Body() userDto: ResetPasswordDto) {
        return this.usersService.resetPassword(userDto);
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    @OKResponseData(LoginVo)
    async login(@Body() loginDto: LoginDto) {
        return this.usersService.login(loginDto);
    }
}
