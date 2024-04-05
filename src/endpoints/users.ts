import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiUser, ApiUserUpdateRequest } from '../api';

export interface UserOperations {
  refresh: () => Promise<void>;
  list: (ids?: string[]) => Promise<ApiUser[]>;
  search: (q: string) => Promise<ApiUser[]>;
  update: (user_id: string, data: ApiUserUpdateRequest) => Promise<void>;
  remove: (user_id: string) => Promise<void>;
  createAdmin: (user_id: string) => Promise<void>;
  removeAdmin: (user_id: string) => Promise<void>;
}

export const userOperations = (opts: MobilixClientOptions): UserOperations => ({
  refresh: async () =>
    await call<undefined, undefined>('POST', `/users/refresh`, { ...opts }),
  list: async (ids) =>
    await call<undefined, ApiUser[], { ids?: string }>('GET', `/users`, {
      ...opts,
      params: {
        ids: ids && ids.length > 0 ? ids.join(',') : undefined,
      },
    }),
  search: async (q) =>
    await call<undefined, ApiUser[], { q: string }>('GET', `/users`, {
      ...opts,
      params: { q },
    }),
  update: async (user_id, data: ApiUserUpdateRequest) =>
    await call<ApiUserUpdateRequest, undefined>('PATCH', `/users/${user_id}`, {
      ...opts,
      body: data,
    }),
  remove: async (user_id) =>
    await call<undefined, undefined>('DELETE', `/users/${user_id}`, {
      ...opts,
    }),
  createAdmin: async (user_id) =>
    await call<undefined, undefined>('PUT', `/users/${user_id}/admin`, {
      ...opts,
    }),
  removeAdmin: async (user_id) =>
    await call<undefined, undefined>('DELETE', `/users/${user_id}/admin`, {
      ...opts,
    }),
});
