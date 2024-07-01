/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";
import { UserDTO } from "src/DTO/user.dto";
import { TokenService } from "src/modules/Auth/service";
import { PrismaService } from "src/modules/ConnectDatabase/prisma.service";
import { hashPassword } from "src/util/hash-password";


export class UserRepository {
    constructor(private readonly prismaService: PrismaService, private readonly tokenService: TokenService) { }
    async excuse(input: Omit<UserDTO, 'id'>): Promise<any> {
        try {
            const checkExitEmail = await this.prismaService.user.findUnique({
                where: {
                    email: input.email
                }
            })
            if (checkExitEmail) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
            const hashedPassword = await hashPassword(input.password);
            const res = await this.prismaService.user.create({
                data: { ...input, password: hashedPassword }
            })
            const accessToken = await this.tokenService.signJWT({
                payload: {
                    id: res.id,
                    role: res.roles,
                    email: res.email
                }, privateKey: 'ACCESS_TOKEN_SECRET', expired_time: '1h'
            })
            const refreshToken = await this.tokenService.signJWT({
                payload: {
                    id: res.id,
                    role: res.roles,
                    email: res.email
                }, privateKey: 'REFRESH_TOKEN_SECRET', expired_time: '5h'
            })

            return {
                data: res,
                token: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                }
            }
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}