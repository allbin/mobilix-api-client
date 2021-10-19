import querystring from 'querystring';

import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiFilterSetRequest, ApiFilterSet } from '../api';

export interface FilterSetOperations {
  list: (entity_type_id?: string) => Promise<ApiFilterSet[]>;
  get: (id: string) => Promise<ApiFilterSet>;
  create: (filterset: ApiFilterSetRequest) => Promise<ApiFilterSet>;
  update: (id: string, filterset: ApiFilterSetRequest) => Promise<ApiFilterSet>;
  delete: (id: string) => Promise<ApiFilterSet>;
}

export const filterSetOperations = (
  opts: MobilixClientOptions,
): FilterSetOperations => ({
  list: async (entity_type_id) => {
    const qstring = entity_type_id
      ? `?${querystring.stringify({ entity_type_id })}`
      : '';
    return await call<undefined, ApiFilterSet[]>(
      'GET',
      `/filtersets${qstring}`,
      { ...opts },
    );
  },
  get: async (id) =>
    await call<undefined, ApiFilterSet>('GET', `/filtersets/${id}`, {
      ...opts,
    }),
  create: async (filterset) =>
    await call<ApiFilterSetRequest, ApiFilterSet>('POST', `/filtersets`, {
      ...opts,
      body: filterset,
    }),
  update: async (id, filterset) =>
    await call<ApiFilterSetRequest, ApiFilterSet>('PUT', `/filtersets/${id}`, {
      ...opts,
      body: filterset,
    }),
  delete: async (id) =>
    await call<undefined, ApiFilterSet>('DELETE', `/filtersets/${id}`, {
      ...opts,
    }),
});
