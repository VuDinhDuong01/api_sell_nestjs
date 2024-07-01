/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export const hashPassword=async(password: string )=>{
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
}

export const comparePassword=async(hashPassword:string , password: string )=>{
    const match = await bcrypt.compare(password, hashPassword); 
    return match;
}