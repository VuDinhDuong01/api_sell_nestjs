/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from "@nestjs/common";
import { AdapterRegister } from "./adapert";
import { UserDTO } from "src/DTO/user.dto";

@Controller('auth/register')
export class RegisterController {
    constructor(private readonly adapterRegister:AdapterRegister){}
    @Post()
    async register(@Body() body:UserDTO):Promise<any>{
        return this.adapterRegister.excuse(body)
    }
}