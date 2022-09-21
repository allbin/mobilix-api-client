import { AxiosInstance } from 'axios';

type AcquireTokenFunction = () => Promise<string>;

export interface MobilixClientOptions {
  baseUrl: string;
  token?: string | AcquireTokenFunction;
  axios?: AxiosInstance;
}
