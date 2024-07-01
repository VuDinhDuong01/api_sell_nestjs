/* eslint-disable prettier/prettier */

import {  Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { UserRepository } from 'src/repository/user';
import { AdapterRegister } from './adapert';
import { PrismaService } from '../ConnectDatabase/prisma.service';
import { PrismaModule } from '../ConnectDatabase/prisma.module';
import { TokenModule } from '../Auth/jwt.module';
import { TokenService } from '../Auth/service';

@Module({
  imports: [PrismaModule,TokenModule],
  controllers: [RegisterController],
  providers: [{
    provide:AdapterRegister,
    useFactory:(prismaService:PrismaService,tokenService:TokenService)=> new UserRepository(prismaService,tokenService),
    inject:[PrismaService,TokenService]
  }]
})
export class RegisterModule {}