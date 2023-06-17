import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, EditUserDto, UserListVo } from './schema/user';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户管理')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  @ApiOperation({ summary: '用户列表' })
  @ApiOkResponse({
    description: '用户列表',
    type: UserListVo,
    isArray: true,
  })
  index() {
    return this.usersService.getList();
  }

  @Post('create')
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('findById')
  @ApiOperation({ summary: '查询用户信息' })
  detail(@Query('id') id: string) {
    return this.usersService.getInfoById(id);
  }

  @Put('edit')
  @ApiOperation({ summary: '编辑用户信息' })
  edit(@Body() editUserDto: EditUserDto) {
    return this.usersService.editUser(editUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除用户' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
