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
      : typeof opts.token === 'string'
      ? {
          Authorization: `Bearer ${opts.token}`,
        }
      : {}
    : {};

  req.headers = {
    ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
    ...auth,
  };

  if (opts.form) {
    req.data = opts.form;
  } else if (opts.body) {
    req.data = opts.body;
  }

  return await (opts.axios || axios)
    .request<T>({ url, ...req })
    .then((r) => r.data);
};

export default call;
