import {Locator, Page} from '@playwright/test';


export class LoginPage {

    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.loginButton = page.locator('//button[@id="login-button"]');
        this.usernameInput = page.locator(`(//label[normalize-space(text())='Username']/following::input)[1]`);
        this.passwordInput = page.locator(`//label[normalize-space(text())='Password']/following::input`);
        this.submitButton = page.locator(`//button[contains(.,'Login')]`);
    }

    /**
     * Logs in a user with the given credentials.
     * @param username - The email address of the user.
     * @param password - The password of the user.
     */
    public async loginWithUser(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}