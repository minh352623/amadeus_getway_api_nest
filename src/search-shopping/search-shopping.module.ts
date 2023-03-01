import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SearchShoppingController } from './search-shopping.controller';
import { SearchShoppingService } from './search-shopping.service';

@Module({
  imports: [HttpModule],
  controllers: [SearchShoppingController],
  providers: [SearchShoppingService, AuthService],
})
export class SearchShoppingModule {}
