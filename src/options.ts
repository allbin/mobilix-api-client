type AcquireTokenFunction = () => Promise<string>;

export interface MobilixClientOptions {
  baseUrl: string;
  token?: string | AcquireTokenFunction;
}
