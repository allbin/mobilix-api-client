import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiUser } from '../api';

export interface UserOperations {
  refresh: () => Promise<void>;
  list: () => Promise<ApiUser[]>;
  remove: (user_id: string) => Promise<void>;
  createAdmin: (user_id: string) => Promise<void>;
  removeAdmin: (user_id: string) => Promise<void>;
}

export const userOperations = (opts: MobilixClientOptions): UserOperations => ({
  refresh: async () =>
    await call<undefined, undefined>('POST', `/users/refresh`, { ...opts }),
  list: async () =>
    await call<undefined, ApiUser[]>('GET', `/users`, { ...opts }),
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
