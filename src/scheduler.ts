
import * as AWS from '@aws-sdk/client-kms';
// tslint:disable-next-line:no-implicit-dependencies
import {ScheduledEvent} from 'aws-lambda';
import {logger} from './common/logger';
import {DbProvider} from './db/db-provider';
import {GithubApi} from './gitub/github-api';
const kms = new AWS.KMS({region: 'ap-southeast-2'});

const dbp = new DbProvider();
const api = new GithubApi();

export const handler = async (event: ScheduledEvent, context: any) => {

    const r = await dbp.query(new Date().getTime());
    logger.info({data: r});
    const  resp = await api.request();
    logger.info({response: resp});
    return 'executed';

}
