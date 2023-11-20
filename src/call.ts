import axios, { AxiosRequestConfig, Method } from 'axios';

import { MobilixClientOptions } from './options';

const call = async <R, T, P = undefined>(
  method: Method,
  url: string,
  opts: MobilixClientOptions & { body?: R; form?: FormData; params?: P },
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
    ...auth,
  };

  if (opts.params) {
    req.params = opts.params;
  }

  if (opts.form) {
    req.data = opts.form;
    req.headers['Content-Type'] = 'multipart/form-data';
  } else if (opts.body) {
    req.data = opts.body;
    req.headers['Content-Type'] = 'application/json';
  }

  return await (opts.axios || axios)
    .request<T>({ url, ...req })
    .then((r) => r.data);
};

export default call;
