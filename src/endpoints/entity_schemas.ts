import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiEntitySchemaRequest, ApiEntitySchema } from '../api';

export interface EntitySchemaOperations {
  list: () => Promise<ApiEntitySchema[]>;
  get: (id: string) => Promise<ApiEntitySchema>;
  create: (schema: ApiEntitySchemaRequest) => Promise<ApiEntitySchema>;
  update: (
    id: string,
    schema: ApiEntitySchemaRequest,
  ) => Promise<ApiEntitySchema>;
  delete: (id: string) => Promise<ApiEntitySchema>;
}

export const entitySchemaOperations = (
  opts: MobilixClientOptions,
): EntitySchemaOperations => ({
  list: async () =>
    await call<undefined, ApiEntitySchema[]>('GET', `/entity_schemas`, {
      ...opts,
    }),
  get: async (id: string) =>
    await call<undefined, ApiEntitySchema>('GET', `/entity_schemas/${id}`, {
      ...opts,
    }),
  create: async (schema: ApiEntitySchemaRequest) =>
    await call<ApiEntitySchemaRequest, ApiEntitySchema>(
      'POST',
      `/entity_schemas`,
      { ...opts, body: schema },
    ),
  update: async (id: string, schema: ApiEntitySchemaRequest) =>
    await call<ApiEntitySchemaRequest, ApiEntitySchema>(
      'PUT',
      `/entity_schemas/${id}`,
      { ...opts, body: schema },
    ),
  delete: async (id: string) =>
    await call<undefined, ApiEntitySchema>('DELETE', `/entity_schemas/${id}`, {
      ...opts,
    }),
});
