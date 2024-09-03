import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: LoginAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('logout')
  logout() {
    return this.authService.findAll();
  }

  @Get('validate')
  validar(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
}
