import querystring from 'querystring';

import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiEntityRequest, ApiEntity, ApiEntityChangeSet } from '../api';

export interface EntityOperations {
  list: (entity_type_id?: string) => Promise<ApiEntity[]>;
  get: (id: string) => Promise<ApiEntity>;
  create: (entity: ApiEntityRequest) => Promise<ApiEntity>;
  update: (id: string, entity: ApiEntityRequest) => Promise<ApiEntity>;
  delete: (id: string) => Promise<ApiEntity>;
  listChangeSets: (entity_type_id: string) => Promise<ApiEntityChangeSet[]>;
  getChangeSet: (
    entity_type_id: string,
    changeset_id: string,
  ) => Promise<ApiEntityChangeSet>;
}

export const entityOperations = (
  opts: MobilixClientOptions,
): EntityOperations => ({
  list: async (entity_type_id) => {
    const qstring = entity_type_id
      ? `?${querystring.stringify({ entity_type_id })}`
      : '';
    return await call<undefined, ApiEntity[]>('GET', `/entities${qstring}`, {
      ...opts,
    });
  },
  get: async (id) =>
    await call<undefined, ApiEntity>('GET', `/entities/${id}`, { ...opts }),
  create: async (entity) =>
    await call<ApiEntityRequest, ApiEntity>('POST', `/entities`, {
      ...opts,
      body: entity,
    }),
  update: async (id, entity) =>
    await call<ApiEntityRequest, ApiEntity>('PUT', `/entities/${id}`, {
      ...opts,
      body: entity,
    }),
  delete: async (id) =>
    await call<undefined, ApiEntity>('DELETE', `/entities/${id}`, { ...opts }),
  listChangeSets: async (entity_type_id) =>
    await call<undefined, ApiEntityChangeSet[]>(
      'GET',
      `/entities/${entity_type_id}/changesets`,
      { ...opts },
    ),
  getChangeSet: async (entity_type_id, changeset_id) =>
    await call<undefined, ApiEntityChangeSet>(
      'GET',
      `/entities/${entity_type_id}/changesets/${changeset_id}`,
      { ...opts },
    ),
});
