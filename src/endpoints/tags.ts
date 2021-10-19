import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiTagRequest, ApiTag } from '../api';

export interface TagOperations {
  list: () => Promise<ApiTag[]>;
  get: (id: string) => Promise<ApiTag>;
  create: (tag: ApiTagRequest) => Promise<ApiTag>;
  update: (id: string, tag: ApiTagRequest) => Promise<ApiTag>;
  delete: (id: string) => Promise<ApiTag>;
}

export const tagOperations = (opts: MobilixClientOptions): TagOperations => ({
  list: async () =>
    await call<undefined, ApiTag[]>('GET', `/tags`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiTag>('GET', `/tags/${id}`, { ...opts }),
  create: async (tag) =>
    await call<ApiTagRequest, ApiTag>('POST', `/tags`, { ...opts, body: tag }),
  update: async (id, tag) =>
    await call<ApiTagRequest, ApiTag>('PUT', `/tags/${id}`, {
      ...opts,
      body: tag,
    }),
  delete: async (id) =>
    await call<undefined, ApiTag>('DELETE', `/tags/${id}`, { ...opts }),
});
