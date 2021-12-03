import querystring from 'querystring';

import call from '../call';

import { MobilixClientOptions } from '../options';
import {
  ApiAttachment,
  ApiEntityRequest,
  ApiEntityEventClientRequest,
  ApiEntity,
  ApiEntityEvent,
  ApiEntityChangeSet,
} from '../api';

export interface EntityOperations {
  list: (entity_type_id?: string) => Promise<ApiEntity[]>;
  get: (id: string) => Promise<ApiEntity>;
  getMany: (ids: string[]) => Promise<ApiEntity[]>;
  create: (entity: ApiEntityRequest) => Promise<ApiEntity>;
  update: (id: string, entity: ApiEntityRequest) => Promise<ApiEntity>;
  updateMany: (
    entities: Record<string, ApiEntityRequest>,
  ) => Promise<Record<string, ApiEntity>>;
  delete: (id: string) => Promise<ApiEntity>;
  listChangeSets: (entity_id: string) => Promise<ApiEntityChangeSet[]>;
  getChangeSet: (
    entity_id: string,
    changeset_id: string,
  ) => Promise<ApiEntityChangeSet>;
  listEvents: (entity_id: string) => Promise<ApiEntityEvent[]>;
  createEvent: (
    entity_id: string,
    event: ApiEntityEventClientRequest,
    files?: File[],
  ) => Promise<ApiEntityEvent>;
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
  getMany: async (ids) =>
    await call<undefined, ApiEntity[]>(
      'GET',
      `/entities?ids=${ids.join(',')}`,
      { ...opts },
    ),
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
  updateMany: async (entities) =>
    await call<Record<string, ApiEntityRequest>, Record<string, ApiEntity>>(
      'PUT',
      `/entities`,
      {
        ...opts,
        body: entities,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiEntity>('DELETE', `/entities/${id}`, { ...opts }),
  listChangeSets: async (entity_id) =>
    await call<undefined, ApiEntityChangeSet[]>(
      'GET',
      `/entities/${entity_id}/changesets`,
      { ...opts },
    ),
  getChangeSet: async (entity_id, changeset_id) =>
    await call<undefined, ApiEntityChangeSet>(
      'GET',
      `/entities/${entity_id}/changesets/${changeset_id}`,
      { ...opts },
    ),
  listEvents: async (entity_id) =>
    await call<undefined, ApiEntityEvent[]>(
      'GET',
      `/entities/${entity_id}/events`,
      { ...opts },
    ),
  createEvent: async (entity_id, event, files) => {
    const uploads =
      files && files.length
        ? files.map((file) => {
            const data = new FormData();
            data.append('file', file);
            return call<undefined, ApiAttachment>('POST', `/attachments`, {
              ...opts,
              form: data,
            });
          })
        : [];

    const uploaded = await Promise.all(uploads);

    const body: ApiEntityEventClientRequest =
      event.type === 'comment'
        ? {
            type: 'comment',
            data: uploaded.length
              ? {
                  ...event.data,
                  attachments: uploaded.map((upload) => ({
                    name: upload.name,
                    mime_type: upload.mime_type,
                    attachment: upload.id,
                  })),
                }
              : { ...event.data },
          }
        : {
            type: 'police-report',
            data: {
              ...event.data,
            },
          };

    return await call<ApiEntityEventClientRequest, ApiEntityEvent>(
      'POST',
      `/entities/${entity_id}/events`,
      {
        ...opts,
        body,
      },
    );
  },
});
