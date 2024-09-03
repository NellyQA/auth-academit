import { Controller, Get, Post, Body, Param, Headers } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IResponseDto } from 'src/shared/responseDTO/response.dto';
import { LoginResponse } from './dto/response/loginResponse.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión', description: 'Permite al usuario iniciar sesión en el sistema.', operationId: 'loginUser' })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso.',
    type: LoginResponse
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales no válidas.',
    content: {
      'application/json': {
        example: {
          message: 'Credenciales no válidas',
          statusCode: '401',
        },
      },
    },
  })
  async login(@Body() createAuthDto: LoginAuthDto): Promise<IResponseDto> {
    const resultado = await this.authService.login(createAuthDto);
    const respuesta: IResponseDto = {
      data: resultado,
      message: 'Login con éxito',
      statusCode: '200',
    };
    return respuesta;
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión', description: 'Permite al usuario cerrar sesión en el sistema.', operationId: 'logoutUser' })
  @ApiResponse({
    status: 200,
    description: 'Cierre de sesión exitoso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autenticado.',
    content: {
      'application/json': {
        example: {
          message: 'Usuario no autenticado',
          statusCode: '401',
        },
      },
    },
  })
  logout(): IResponseDto {
    // Implementar la lógica para logout
    return {
      data: null,
      message: 'Logout con éxito',
      statusCode: '200',
    };
  }

  //TODO: Corregir el mandar authorizacion por swagguer
  @Post('validate')
  @ApiOperation({ summary: 'Validar TOKEN', description: 'Permite validar un Token.', operationId: 'validarToken' })
  @ApiHeader({
    name: 'authorization',
    description: 'Token de autorización en el formato: Bearer [token]',
    required: true,
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR...',
  })
  @ApiResponse({
    status: 200,
    description: 'Token validado exitosamente.',
    content: {
      'application/json': {
        example: {
          data: { valid: true },
          message: 'Resultado de verificación de token',
          statusCode: '200',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Token no válido o ausente.',
    content: {
      'application/json': {
        example: {
          message: 'Token no válido',
          statusCode: '401',
        },
      },
    },
  })
  async validar(@Headers('authorization') authorization: string): Promise<IResponseDto> {
    const resultado = await this.authService.validarJWT(authorization);
    const respuesta: IResponseDto = {
      data: resultado,
      message: 'Resultado de verificación de token',
      statusCode: '200',
    };
    return respuesta;
  }
}