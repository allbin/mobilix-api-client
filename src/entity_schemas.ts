import call from './call';

import { MobilixClientOptions } from './options';

export interface EntitySchemaOperations {
  list: () => Promise<ApiEntitySchema[]>;
  get: (id: string) => Promise<ApiEntitySchema>;
  post: (schema: ApiEntitySchemaRequest) => Promise<ApiEntitySchema>;
  put: (id: string, schema: ApiEntitySchemaRequest) => Promise<ApiEntitySchema>;
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
  post: async (schema: ApiEntitySchemaRequest) =>
    await call<ApiEntitySchemaRequest, ApiEntitySchema>(
      'POST',
      `/entity_schemas`,
      { ...opts, body: schema },
    ),
  put: async (id: string, schema: ApiEntitySchemaRequest) =>
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
