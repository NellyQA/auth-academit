import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/create-auth.dto';


@Injectable()
export class AuthService {
  async login(login: LoginAuthDto) {
    const user = await this.validarUser(login.email, login.password)
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async validarUser(user: string, password: string) {
    const usuarioRegistrado = {
      email: 'fran@gmail.com',
      password: '1234567',
      nombre: 'Francisco',
      apellido : 'Jimenez',
      telefono : '+54-111234567'
    }
    if (user !== usuarioRegistrado.email || password !== usuarioRegistrado.password) {
      throw new UnauthorizedException('Usuario o contraseña invalida')
    }
    return usuarioRegistrado
  }
}
