import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiTenant } from '../api';

export interface TenantOperations {
  list: () => Promise<ApiTenant[]>;
}

export const tenantOperations = (
  opts: MobilixClientOptions,
): TenantOperations => ({
  list: async () =>
    await call<undefined, ApiTenant[]>('GET', `/tenants`, { ...opts }),
});
