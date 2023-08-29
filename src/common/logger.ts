import { Logger } from '@aws-lambda-powertools/logger';

// @ts-ignore

export const logger = new Logger({
    serviceName: 'aws-lambda-template',
    environment: 'staging',
    persistentLogAttributes: {
        AppId: 'APP-12333',
        env: 'dev',
    },
});
