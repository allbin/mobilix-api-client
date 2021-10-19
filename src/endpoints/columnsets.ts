import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiColumnSetRequest, ApiColumnSet } from '../api';

export interface ColumnSetOperations {
  list: (entity_type_id?: string) => Promise<ApiColumnSet[]>;
  get: (id: string) => Promise<ApiColumnSet>;
  create: (columnset: ApiColumnSetRequest) => Promise<ApiColumnSet>;
  update: (id: string, columnset: ApiColumnSetRequest) => Promise<ApiColumnSet>;
  delete: (id: string) => Promise<ApiColumnSet>;
}

export const columnSetOperations = (
  opts: MobilixClientOptions,
): ColumnSetOperations => ({
  list: async (entity_type_id) => {
    const url = entity_type_id
      ? `/columnsets?entity_type_id=${entity_type_id}`
      : `/columnsets`;
    return await call<undefined, ApiColumnSet[]>('GET', url, {
      ...opts,
    });
  },
  get: async (id) =>
    await call<undefined, ApiColumnSet>('GET', `/columnsets/${id}`, {
      ...opts,
    }),
  create: async (columnset) =>
    await call<ApiColumnSetRequest, ApiColumnSet>('POST', `/columnsets`, {
      ...opts,
      body: columnset,
    }),
  update: async (id, columnset) =>
    await call<ApiColumnSetRequest, ApiColumnSet>('PUT', `/columnsets/${id}`, {
      ...opts,
      body: columnset,
    }),
  delete: async (id) =>
    await call<undefined, ApiColumnSet>('DELETE', `/columnsets/${id}`, {
      ...opts,
    }),
});
