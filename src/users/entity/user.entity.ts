import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 't_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', comment: '用户名' })
  userName: string;

  @Column({ name: 'account', comment: '账号' })
  account: string;

  @Column({ name: 'password', comment: '密码' })
  password: string;
}
