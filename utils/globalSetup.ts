import { FullConfig } from "@playwright/test";

import * as dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
  
    if (process.env.NODE_ENV) {
        
        dotenv.config({
             path: `ENV/.env.${process.env.NODE_ENV}`,
                override: true
            });
    }
}

export default globalSetup;
