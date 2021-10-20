import call from '../call';
import type { MobilixClientOptions } from '../options';
import type { ApiEntityTypeRequest, ApiEntityType } from '../api';

export interface EntityTypeOperations {
  list: () => Promise<ApiEntityType[]>;
  create: (type: ApiEntityTypeRequest) => Promise<ApiEntityType>;
}

export const entityTypeOperations = (
  opts: MobilixClientOptions,
): EntityTypeOperations => ({
  list: async () =>
    await call<undefined, ApiEntityType[]>('GET', `/entity_types`, { ...opts }),
  create: async (type) =>
    await call<ApiEntityTypeRequest, ApiEntityType>('POST', `/entity_types`, {
      ...opts,
      body: type,
    }),
});
