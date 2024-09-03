import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';
import { User } from './dto/response/loginResponse.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }
  async login(login: LoginAuthDto) {
    const user = await this.validarUser(login.email, login.password)
    const jwt = await this.crearJWT(user)
    return { jwt }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async validarUser(user: string, password: string): Promise<User> {
    const usuarioRegistrado = {
      email: 'fran@gmail.com',
      password: '1234567',
      nombre: 'Francisco',
      apellido: 'Jimenez',
      telefono: '+54-111234567'
    }
    if (user !== usuarioRegistrado.email || password !== usuarioRegistrado.password) {
      throw new UnauthorizedException('Usuario o contraseña invalida')
    }
    delete usuarioRegistrado.password
    return usuarioRegistrado
  }

  async crearJWT(payload: User) {
    return this.jwtService.signAsync(payload)
  }
  async validarJWT(token: string) {
    try {
      return await this.jwtService.verifyAsync(token)
    } catch (error) {
      throw new UnauthorizedException("No se pudo verificar el token " + error.message)
    }

  }
}
