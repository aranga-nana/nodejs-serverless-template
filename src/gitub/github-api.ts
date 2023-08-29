// tslint:disable-next-line:no-implicit-dependencies
import axios, {AxiosResponse} from 'axios';
import {IRepo} from '../model/repo';
import {IRepoVo} from './domain/repo-vo';
const baseUrl = process.env.API_BASE_PATH || '';
export class GithubApi {

    public request(): Promise<IRepoVo> {

        // @ts-ignore
        return axios.get<IRepoVo[]>(`${baseUrl}/aranga-nana/repos`, {
            headers: {
                Accept: 'application/json',
            },
        }).then((response: AxiosResponse<IRepoVo[]>) => {
                 if (!response.data) {
                     return []
                 }
                 return response.data as IRepoVo[];
         });
    }
}
