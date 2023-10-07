// Imports
const os = require('os');
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { EnvConfig } from './../constants/env.config';
import {
  nNumLookupDefaultSearch,
  nNumLookupHomePage,
  nNumLookupLogIn,
  nNumLookupSearch,
} from './../constants/network';

const browserData = {
  numLookUpInstance: null,
  isNumLookUpLoggedIn: false,
  numLookUpAuthToken: '',
};

@Injectable()
export class BrowserService {
  async login(reqData) {
    if (reqData.type == 1) return await this.logInToNumberLookup();
  }

  async logInToNumberLookup() {
    if (browserData.isNumLookUpLoggedIn == true)
      return {
        msg: 'Already logged in !',
        numLookUpAuthToken: browserData.numLookUpAuthToken,
      };

    if (!browserData.numLookUpInstance) {
      browserData.numLookUpInstance = await puppeteer.launch({
        defaultViewport: null,
        headless: os.type() == 'Darwin' ? false : true,
      });
    }
    const currentPage = await browserData.numLookUpInstance.newPage();
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
    await this.delay(3137);
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

    const onFrameNavigationListener = async (req) => {
      if (req.url() == nNumLookupHomePage) {
        await this.delay(6788);
        await currentPage.goto(nNumLookupDefaultSearch);
        currentPage.removeListener('framenavigated', onFrameNavigationListener);
      }
    };
    currentPage.on('framenavigated', onFrameNavigationListener);

    const onReqListener = (req) => {
      if (req.url().includes(nNumLookupSearch)) {
        const authToken = req
          .headers()
          .authorization?.replace('Bearer ', '')
          ?.trim();
        if (authToken) {
          browserData.numLookUpAuthToken = authToken;
          browserData.isNumLookUpLoggedIn = true;
          currentPage.removeListener('request', onReqListener);
        }
      }
    };
    currentPage.on('request', onReqListener);
  }

  delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}
