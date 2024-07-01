/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { TokenService } from './service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [TokenService],
  exports:[TokenService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule để sử dụng ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'), // Lấy giá trị từ biến môi trường
        signOptions: {
          expiresIn: '60s', // Thời gian hết hạn của token
        },
      }),
      
      inject: [ConfigService], // Inject ConfigService để sử dụng trong useFactory
    }),
  ],
  // imports:[JwtModule.register({
  //   secret: `ACCESS_TOKEN_SECRET`,
  //   signOptions: { expiresIn: '60s' },
  // }),]
})
export class TokenModule {}