// Imports
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrowserController } from './browser/browser.controller';
import { BrowserService } from './browser/browser.service';

@Global()
@Module({
  imports: [],
  controllers: [AppController, BrowserController],
  providers: [AppService, BrowserService],
})
export class AppModule {}
