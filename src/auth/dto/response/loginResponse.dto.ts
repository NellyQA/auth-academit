import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";
import { IResponseDto } from "src/shared/responseDTO/response.dto";



export class JwtTokenDtoResponse {
    @ApiProperty({
        description: 'Token de Usuario',
        example: 'DSHJNSDSD.ASDFABHGFDGFGTDX.CBSHD=!'
      })
      jwt: string;
}


export class User  {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'fran@gmail.com'
      })
      email: string;
 
 
      @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Francisco'
      })
      nombre: string;
 
      @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Jimenez'
      })
      apellido: string;
 
      @ApiProperty({
        description: 'Teléfono del usuario',
        example: '+54-111234567'
      })
      telefono: string;
 
  };



export class LoginResponse implements IResponseDto {
    @ApiProperty({
        description: 'Los datos de la respuesta, pueden ser un objeto o un arreglo de objetos',
        type: JwtTokenDtoResponse
    })
    @IsObject()
    data: Array<any> | object;

    @ApiProperty({
        description: 'Mensaje descriptivo del resultado',
        example: 'Operación realizada con éxito'
    })
    @IsString()
    message: string;

    @ApiProperty({
        description: 'Código de estado HTTP',
        example: '200'
    })
    @IsString()
    statusCode: string;


}