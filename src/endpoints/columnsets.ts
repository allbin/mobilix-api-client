import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiColumnSet, ApiColumnSetRequest } from '../api';

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
    const qstring = entity_type_id
      ? `?${new URLSearchParams({ entity_type_id }).toString()}`
      : '';
    return await call<undefined, ApiColumnSet[]>(
      'GET',
      `/columnsets${qstring}`,
      {
        ...opts,
      },
    );
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
