import { Module } from '@nestjs/common';
import { Covid19Service } from './covid-19.service';
import { Covid19Controller } from './covid-19.controller';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [HttpModule],
  providers: [Covid19Service, AuthService],
  controllers: [Covid19Controller],
})
export class Covid19Module {}
