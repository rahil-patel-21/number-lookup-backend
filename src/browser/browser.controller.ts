// Imports
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
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

  @Get('snapshot')
  async funSnapshot(@Res() res) {
    try {
      const data = await this.service.snapshot();
      return res.send({ data });
    } catch (error) {
      return res.send({ errorMsg: error?.toString() });
    }
  }

  @Post('evaluateJs')
  async funEvaluateJs(@Body() body, @Res() res) {
    try {
      const data = await this.service.login(body);
      return res.send({ data });
    } catch (error) {
      return res.send({ errorMsg: error?.toString() });
    }
  }
}
