import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiArea, ApiAreaRequest } from '../api';

export interface AreaOperations {
  list: () => Promise<ApiArea[]>;
  get: (id: string) => Promise<ApiArea>;
  create: (area: ApiAreaRequest) => Promise<ApiArea>;
  update: (id: string, area: ApiAreaRequest) => Promise<ApiArea>;
  delete: (id: string) => Promise<ApiArea>;
}

export const areaOperations = (opts: MobilixClientOptions): AreaOperations => ({
  list: async () =>
    await call<undefined, ApiArea[]>('GET', '/areas', { ...opts }),
  get: async (id) =>
    await call<undefined, ApiArea>('GET', `/areas/${id}`, { ...opts }),
  create: async (area) =>
    await call<ApiAreaRequest, ApiArea>('POST', '/areas', {
      ...opts,
      body: area,
    }),
  update: async (id, area) =>
    await call<ApiAreaRequest, ApiArea>('PUT', `/areas/${id}`, {
      ...opts,
      body: area,
    }),
  delete: async (id) =>
    await call<undefined, ApiArea>('DELETE', `/areas/${id}`, { ...opts }),
});
