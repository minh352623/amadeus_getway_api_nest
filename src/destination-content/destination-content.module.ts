import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DestinationContentController } from './destination-content.controller';
import { DestinationContentService } from './destination-content.service';

@Module({
  imports: [HttpModule],
  controllers: [DestinationContentController],
  providers: [DestinationContentService, AuthService],
})
export class DestinationContentModule {}
