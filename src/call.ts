import axios, { AxiosRequestConfig, Method } from 'axios';

import { MobilixClientOptions } from './options';

const call = async <R, T>(
  method: Method,
  url: string,
  opts: MobilixClientOptions & { body?: R; form?: FormData },
): Promise<T> => {
  const req: AxiosRequestConfig<R | FormData> = {
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

  if (opts.form) {
    req.data = opts.form;
  } else if (opts.body) {
    req.data = opts.body;
    req.headers = {
      'Content-Type': 'application/json',
      ...auth,
    };
  }

  return await axios.request<T>({ url, ...req }).then((r) => r.data);
};

export default call;
