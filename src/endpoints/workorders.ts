import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiWorkOrderRequest, ApiWorkOrder } from '../api';

export interface WorkOrderOperations {
  list: () => Promise<ApiWorkOrder[]>;
  get: (id: string) => Promise<ApiWorkOrder>;
  create: (workorder: ApiWorkOrderRequest) => Promise<ApiWorkOrder>;
  update: (id: string, workorder: ApiWorkOrderRequest) => Promise<ApiWorkOrder>;
  delete: (id: string) => Promise<ApiWorkOrder>;
}

export const workOrderOperations = (
  opts: MobilixClientOptions,
): WorkOrderOperations => ({
  list: async () =>
    await call<undefined, ApiWorkOrder[]>('GET', `/workorders`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiWorkOrder>('GET', `/workorders/${id}`, {
      ...opts,
    }),
  create: async (workorder) =>
    await call<ApiWorkOrderRequest, ApiWorkOrder>('POST', `/workorders`, {
      ...opts,
      body: workorder,
    }),
  update: async (id, workorder) =>
    await call<ApiWorkOrderRequest, ApiWorkOrder>('PUT', `/workorders/${id}`, {
      ...opts,
      body: workorder,
    }),
  delete: async (id) =>
    await call<undefined, ApiWorkOrder>('DELETE', `/workorders/${id}`, {
      ...opts,
    }),
});
