/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export class TokenService {
    constructor(private readonly configService:ConfigService, private readonly jwtService: JwtService ){}
    async signJWT({ payload,privateKey, expired_time }: { payload: any,privateKey: string , expired_time: string }): Promise<string> {
        return  await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>(privateKey),
            expiresIn: expired_time
        })
    }
    
}