// Imports
import { Body, Controller, Post, Res } from '@nestjs/common';
import { BrowserService } from './browser.service';

@Controller('browser')
export class BrowserController {
  constructor(private readonly service: BrowserService) {}

  @Post('login')
  async funLogin(@Body() body, @Res() res) {
    try {
      const data = await this.service.login(body);
      return res.send({ data });
    } catch (error) {
      return res.send({ errorMsg: error?.toString() });
    }
  }
}
