import { test, expect, Page } from '@playwright/test';
import { webHelper } from '../Helper/webHelper';
import ENV from '../ENV/env';
import { home } from '../page/home.page';

let page: Page;

test.describe('Home Page Tests', async() => {
  

  test('should display the home page title', async ({ page }) => {
    const helper = new webHelper(page, 'Home Page Tests');
    await page.goto(ENV.BASE_URL);
    await page.waitForTimeout(10000);
    
    
  });
});