import fs from 'fs';
import path from 'path';

interface EnvironmentConfig {
    BASE_URL: string;
    USERNAME: string;
    PASSWORD: string;
    CMS_ROUTE: string;
}

interface ConfigFile {
    [key: string]: EnvironmentConfig;
}

export default class ENV {
    private static config: EnvironmentConfig;

    private static loadConfig(): void {
        if (!ENV.config) {
            const environment = process.env.NODE_ENV || 'dev';
            const configPath = path.join(__dirname, './envConfig.json');
            
            try {
                const configFile = fs.readFileSync(configPath, 'utf-8');
                const configData: ConfigFile = JSON.parse(configFile);
                
                if (!configData[environment]) {
                    throw new Error(`No configuration found for environment: ${environment}`);
                }
                
                ENV.config = configData[environment];
            } catch (error) {
                throw new Error(`Failed to load configuration: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }

    public static get BASE_URL(): string {
        ENV.loadConfig();
        return ENV.config.BASE_URL;
    }

    public static get USERNAME(): string {
        ENV.loadConfig();
        return ENV.config.USERNAME;
    }

    public static get PASSWORD(): string {
        ENV.loadConfig();
        return ENV.config.PASSWORD;
    }

    public static get CMS_ROUTE(): string {
        ENV.loadConfig();
        return ENV.config.CMS_ROUTE;
    }
}