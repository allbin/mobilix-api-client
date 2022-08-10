import call from '../call';

import { MobilixClientOptions } from '../options';
import type { ApiFeatureLicense } from '../api';

export interface FeatureLicenseOperations {
  list: () => Promise<ApiFeatureLicense[]>;
}

export const featureLicenseOperations = (
  opts: MobilixClientOptions,
): FeatureLicenseOperations => ({
  list: async () =>
    await call<undefined, ApiFeatureLicense[]>('GET', `/feature_licenses`, {
      ...opts,
    }),
});
