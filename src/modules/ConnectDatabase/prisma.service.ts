/* eslint-disable prettier/prettier */

import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(configService: ConfigService) {
        super({
            datasources: {
                db: {
                    url: `postgresql://${configService.get('POSTGRES_NAME')}:${configService.get('POSTGRES_PASSWORD')}@localhost:${configService.get('POSTGRES_PORT')}/${configService.get('POSTGRES_DB')}`
                }
            }
        });
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}