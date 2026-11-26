import call from '../call';

import { MobilixClientOptions } from '../options';
import {
  ApiAttachment,
  ApiCheckInRequest,
  ApiEntity,
  ApiEntityChangeSet,
  ApiEntityEvent,
  ApiEntityEventClientRequest,
  ApiEntityRequest,
} from '../api';

export interface EntityOperations {
  list: (entity_type_id?: string) => Promise<ApiEntity[]>;
  get: (id: string) => Promise<ApiEntity>;
  getMany: (ids: string[]) => Promise<ApiEntity[]>;
  /**
   * POST /entities. Needs `entities:create`. The created entity has
   * `origin: 'manual'`, whatever its type. For every type `source_id` must be
   * a string (422) and a live entity of the type with the same `source_id` is
   * 409.
   *
   * When the entity type's name is `stop` the API also validates the request
   * and fills in the properties the imports would compute. Other types get
   * the schema validation only.
   * - `source_id` is required, trimmed, in the format `<number>-<code>`:
   *   number without leading zeros, code of letters and digits, case kept as
   *   sent. Anything else is 422.
   * - 409 when a live stop in the tenant already has that `source_id`,
   *   compared without regard to case; the message names the stored id. A
   *   deleted stop does not count, so its ID can be used again.
   * - `meta.name` and `meta.location` (`[longitude, latitude]`) are
   *   required. The 422 message says which one is missing.
   * - A `derived.*` property in the request is 422.
   * - When the schema has them, the server computes `meta.id`,
   *   `meta.group_id`, `meta.number` and `meta.code` from `source_id`, and
   *   `meta.county.code`, `meta.county.name`, `meta.municipality.code`,
   *   `meta.municipality.name` and `meta.rurality` from `meta.location`
   *   through SCB. Sent values for these are replaced. A position outside
   *   every county or municipality is 422; when SCB cannot be reached the
   *   response is 500 and nothing is created.
   * - When not sent and the schema has them: `meta.active` is true,
   *   `meta.passing_routes` is `[]`, and every other `location` property
   *   defaults to `meta.location`.
   *
   * An import whose source later contains the stop's `source_id` takes it
   * over: `origin` becomes `'import'` for good and the stop follows the
   * import's rules from then on.
   */
  create: (entity: ApiEntityRequest) => Promise<ApiEntity>;
  /**
   * PUT /entities/{id}. Needs `entities:update`. 404 for an entity the user
   * cannot see, 422 for properties that fail the schema or an
   * `entity_type_id` that is not the entity's. A stale `changeset_head` on
   * an ordinary edit is merged with the current head, not rejected.
   *
   * Imported stops (`origin: 'import'`) and every other entity type keep the
   * schema's rules: a changed non-modifiable property is 422 "readonly
   * property" and `source_id` is ignored.
   *
   * A manual stop (`origin: 'manual'`) edited by a tenant-level user with
   * `entities:create` may also change non-modifiable properties, e.g.
   * `meta.name`, `meta.zone`, `meta.class`, `meta.road_authority`,
   * `meta.maintenance_district` and `meta.active` (deactivate and
   * reactivate). A changed `derived.*` stays 422. The computed properties
   * (`meta.id`, `meta.group_id`, `meta.number`, `meta.code`, county,
   * municipality, rurality) are set by the server; sent values are replaced
   * by the stored ones. A different `source_id` changes the stop id under
   * the rules of `create` (422 on format, 409 on a duplicate, a change of
   * case only is allowed) and recomputes the ID properties; the entity id
   * stays, so work orders, photos and history follow. An id change from a
   * stale `changeset_head` is 409. A new `meta.location` recomputes county,
   * municipality and rurality (422 outside every county or municipality;
   * when SCB cannot be reached the stored values are kept and the move is
   * saved); a move from a stale `changeset_head` while another user also
   * moved the stop is 409. Contractors (users with an `organization_id`)
   * keep the strict rules even with `entities:create`.
   */
  update: (id: string, entity: ApiEntityRequest) => Promise<ApiEntity>;
  /**
   * PUT /entities with requests keyed by entity id; answers with the updated
   * entities keyed by id. Every entity follows the rules of `update`. All
   * must share one `entity_type_id` (otherwise 422), and the call is one
   * transaction: one failing entity (404, 409, 422) fails the whole call and
   * nothing is written.
   */
  updateMany: (
    entities: Record<string, ApiEntityRequest>,
  ) => Promise<Record<string, ApiEntity>>;
  /**
   * DELETE /entities/{id}. Needs `entities:delete`. Soft delete; returns the
   * deleted entity. 404 for an entity the user cannot see. Only an entity
   * with `origin: 'manual'` can be deleted: an imported one, which includes
   * every entity that existed before `origin` was introduced, is 422. 409
   * when a live work order in any state or a live check-in plan lists the
   * entity; the message says to deactivate it instead (`meta.active` through
   * `update`). Recurring work order plans select stops through a filter set
   * and do not block a delete. After the delete, `create` and the imports
   * accept the same `source_id` again.
   */
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
  /**
   * Records a check-in on the entity. `request.result` says what the
   * check-in led to and is returned on the check-in in `ApiEntity.checkins`;
   * without a request no body is sent.
   */
  createCheckIn: (
    entity_id: string,
    request?: ApiCheckInRequest,
  ) => Promise<void>;
}

export const entityOperations = (
  opts: MobilixClientOptions,
): EntityOperations => ({
  list: async (entity_type_id) => {
    const qstring = entity_type_id
      ? `?${new URLSearchParams({ entity_type_id }).toString()}`
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
  createCheckIn: async (entity_id, request) =>
    await call<ApiCheckInRequest, undefined>(
      'POST',
      `/entities/${entity_id}/checkin`,
      {
        ...opts,
        body: request,
      },
    ),
});
