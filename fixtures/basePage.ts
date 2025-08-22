import { LoginPage } from "../page/Login.Page";
import {test as baseTest} from "@playwright/test";
import {home} from "../page/home.page";
import { webHelper } from "../Helper/webHelper";
import { Page } from "@playwright/test";




const test = baseTest.extend<{
  loginPage: LoginPage;
  home: home;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  home: async ({ page }, use) => {
    await use(new home(page));
  },
});


export default test;
export const expect = test.expect;