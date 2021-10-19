import call from './call';
import { MobilixClientOptions } from './options';

export interface EntityTypeOperations {
  list: () => Promise<ApiEntityType[]>;
}

export const entityTypeOperations = (
  opts: MobilixClientOptions,
): EntityTypeOperations => ({
  list: async () =>
    await call<undefined, ApiEntityType[]>('GET', `/entity_types`, { ...opts }),
});
