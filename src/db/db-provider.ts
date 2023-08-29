import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import {ITaskVo} from './domain/task';

export class DbProvider {

    public query(ts: number): Promise<ITaskVo[]> {
        const client = new DynamoDBClient({region: 'ap-southeast-2'});
        const command = new QueryCommand({
            TableName: 'testdb',
            IndexName: 'index',
            KeyConditionExpression: '#status = :status and #ts < :v_ts',
            ExpressionAttributeNames: {
                '#status': 'status',
                '#ts': 'createDateTimeTs',
            },
            ExpressionAttributeValues: {
                ':status': {S: 'Active'},
                ':v_ts': {N: `${ts}`},
            },
        });
        return client.send(command).then((response) => {
            if (!response.Items) {
                return [];
            }
            const result: ITaskVo[] = [];
            response.Items.forEach((r) => {
                result.push(this.map(r));
            });
            return result;
        });
    }
    private map(rec: any): ITaskVo {
        const session: ITaskVo = {
            pk: rec.pk.S,
            sk: rec.sk.S,
            status: rec.status.S,
            createDateTime: rec.createDateTime.S,
            createDateTimeTs: rec.createDateTimeTs.N,
        }
        return session;
    }
}
