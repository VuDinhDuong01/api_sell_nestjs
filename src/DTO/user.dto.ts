/* eslint-disable prettier/prettier */

export interface UserDTO {
    id: string
    username: string
    email: string
    password: string
    status?:  'ACTIVE' | 'INACTIVE'
    roles?: 'ADMIN' |'USER'
    address?: string
    avatar?: string
    cover_photo?: string
    created_at?: string
    updated_at?: string
}