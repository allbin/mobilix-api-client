import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiUser } from '../api';

export interface UserOperations {
  list: (ids: string[]) => Promise<ApiUser[]>;
}

export const userOperations = (opts: MobilixClientOptions): UserOperations => ({
  list: async (ids) => {
    if (ids.length === 0) {
      throw new Error(
        'users.list requires at least one user id; the API no longer supports listing all users',
      );
    }
    return await call<undefined, ApiUser[], { ids: string }>('GET', `/users`, {
      ...opts,
      params: { ids: ids.join(',') },
    });
  },
});
