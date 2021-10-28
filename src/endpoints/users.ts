import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiUser } from '../api';

export interface UserOperations {
  list: () => Promise<ApiUser[]>;
  createAdmin: (user_id: string) => Promise<void>;
  removeAdmin: (user_id: string) => Promise<void>;
}

export const userOperations = (opts: MobilixClientOptions): UserOperations => ({
  list: async () =>
    await call<undefined, ApiUser[]>('GET', `/users`, { ...opts }),
  createAdmin: async (user_id) =>
    await call<undefined, undefined>('PUT', `/users/${user_id}/admin`, {
      ...opts,
    }),
  removeAdmin: async (user_id) =>
    await call<undefined, undefined>('DELETE', `/users/${user_id}/admin`, {
      ...opts,
    }),
});
