/* eslint-disable prettier/prettier */

import { UserDTO } from "src/DTO/user.dto";

export abstract class AdapterRegister {
    abstract excuse(input:UserDTO):Promise<UserDTO>
}