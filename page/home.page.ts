import { Page }  from "@playwright/test";
import { webHelper } from "../Helper/webHelper";


export class home  extends webHelper {

    

   constructor (page: Page) {
       super(page,'home');
       const noByRole = false;
   }
    readonly homePage = this.page.locator('//a[@href="/"]');
   readonly cms = this.page.locator('//a[@href="/cms"]');
   readonly cmsButton = this.page.locator('//button[@id="cms-button"]');
}