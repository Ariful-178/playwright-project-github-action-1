import { LoginPage } from "../page/Login.Page"; 
import {test as setup} from "@playwright/test";
import ENV from "../ENV/env";



setup("auth.setup.ts",async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(ENV.BASE_URL); // Replace with your actual login URL
  await loginPage.loginWithUser(ENV.USERNAME, ENV.PASSWORD); // Replace with actual credentials

  await page.context().storageState({
    path: '.auth/auth.json'
  });

});