import call from '../call';
import type { MobilixClientOptions } from '../options';
import type { ApiEntityType } from '../api';

export interface EntityTypeOperations {
  list: () => Promise<ApiEntityType[]>;
}

export const entityTypeOperations = (
  opts: MobilixClientOptions,
): EntityTypeOperations => ({
  list: async () =>
    await call<undefined, ApiEntityType[]>('GET', `/entity_types`, { ...opts }),
});
