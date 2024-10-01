import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty({message: 'Nome obrigatório'})
    name: string
    
    @IsNotEmpty()
    @IsEmail({}, {message:'E-mail inválido'})
    email: string
}
