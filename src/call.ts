import axios, { AxiosRequestConfig, Method } from 'axios';

import { MobilixClientOptions } from './options';

const call = async <R, T>(
  method: Method,
  url: string,
  opts: MobilixClientOptions & { body?: R },
): Promise<T> => {
  const req: AxiosRequestConfig<R> = {
    method,
    headers: {},
    baseURL: opts.baseUrl,
  };
  const auth: AxiosRequestConfig['headers'] = opts.token
    ? typeof opts.token === 'function'
      ? {
          Authorization: `Bearer ${await opts.token()}`,
        }
      : {
          Authorization: `Bearer ${opts.token}`,
        }
    : {};

  req.headers = {
    'Content-Type': 'application/json',
    ...auth,
  };

  if (opts.body) {
    req.data = opts.body;
  }

  return await axios.request<T>({ url, ...req }).then((r) => r.data);
};

export default call;
