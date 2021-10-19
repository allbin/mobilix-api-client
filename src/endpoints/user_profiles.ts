import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiUserProfileRequest, ApiUserProfile } from '../api';

export interface UserProfileOperations {
  get: () => Promise<ApiUserProfile>;
  update: (profile: ApiUserProfileRequest) => Promise<ApiUserProfile>;
  delete: () => Promise<ApiUserProfile>;
}

export const userProfileOperations = (
  opts: MobilixClientOptions,
): UserProfileOperations => ({
  get: async () =>
    await call<undefined, ApiUserProfile>('GET', `/user_profile`, { ...opts }),
  update: async (profile) =>
    await call<ApiUserProfileRequest, ApiUserProfile>('PUT', `/user_profile`, {
      ...opts,
      body: profile,
    }),
  delete: async () =>
    await call<undefined, ApiUserProfile>('DELETE', `/user_profile`, {
      ...opts,
    }),
});
