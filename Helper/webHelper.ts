import { Page, Locator } from '@playwright/test';







export class webHelper {
    constructor(protected page: Page, protected name: string) {}

    async navigateToHome() {
        await this.page.goto('/');
    }

    async clickElement(locator: Locator) {
        await locator.click();
    }









}