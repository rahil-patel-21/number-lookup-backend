// Imports
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { EnvConfig } from 'src/constants/env.config';
import { nNumLookupLogIn } from 'src/constants/network';

@Injectable()
export class BrowserService {
  async login(reqData) {
    if (reqData.type == 1) return await this.logInToNumberLookup();
  }

  async logInToNumberLookup() {
    const browser = await puppeteer.launch({
      defaultViewport: null,
      headless: false,
    });
    const currentPage = await browser.newPage();
    await currentPage.goto(nNumLookupLogIn, { waitUntil: 'networkidle2' });

    // Enter email automatically
    await this.delay(2451);
    await currentPage.type(
      'input[name="loginfmt"]',
      EnvConfig.personalSecrets.email01,
    );
    await this.delay(1289);
    await currentPage.click('input[type="submit"]');

    // Enter password automatically
    await this.delay(2137);
    await currentPage.type(
      'input[name="passwd"]',
      EnvConfig.personalSecrets.email01Pass,
    );
    await this.delay(1159);
    await currentPage.click('input[type="submit"]');
    await this.delay(1985);

    // Save login info
    await currentPage.type('input[name="DontShowAgain"]', 'true');
    await this.delay(1297);
    await currentPage.click('input[type="submit"]');
    await this.delay(1681);
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}
