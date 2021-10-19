import fetch, { RequestInit, HeadersInit } from 'node-fetch';

import { MobilixClientOptions } from './options';

const call = async <R, T>(
  method: string,
  url: string,
  opts: MobilixClientOptions & { body?: R },
): Promise<T> => {
  const req: RequestInit = {
    method,
    headers: {},
  };
  const auth: HeadersInit = opts.token
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
    req.body = JSON.stringify(opts.body);
  }

  return (await fetch(`${opts.baseUrl}${url}`, req).then((res) =>
    res.json(),
  )) as T;
};

export default call;
