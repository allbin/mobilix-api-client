import call from '../call';

import type { MobilixClientOptions } from '../options';
import type {
  ApiAttachment,
  ApiWorkOrder,
  ApiWorkOrderEvent,
  ApiWorkOrderEventClientRequest,
  ApiWorkOrderRequest,
  ApiWorkOrderState,
} from '../api';

interface CreateOptions {
  auto_assign?: boolean;
}

export interface WorkOrderOperations {
  list: (state?: ApiWorkOrderState) => Promise<ApiWorkOrder[]>;
  get: (id: string) => Promise<ApiWorkOrder>;
  create: (
    workorder: ApiWorkOrderRequest,
    options?: CreateOptions,
  ) => Promise<ApiWorkOrder[]>;
  update: (id: string, workorder: ApiWorkOrderRequest) => Promise<ApiWorkOrder>;
  delete: (id: string) => Promise<ApiWorkOrder>;
  listEvents: (workorder_id: string) => Promise<ApiWorkOrderEvent[]>;
  createEvent: (
    workorder_id: string,
    event: ApiWorkOrderEventClientRequest,
    files?: File[],
  ) => Promise<ApiWorkOrderEvent>;
}

export const workOrderOperations = (
  opts: MobilixClientOptions,
): WorkOrderOperations => ({
  list: async (state) => {
    const qstring = state
      ? `?${new URLSearchParams({ state }).toString()}`
      : '';
    return await call<undefined, ApiWorkOrder[]>(
      'GET',
      `/workorders${qstring}`,
      { ...opts },
    );
  },
  get: async (id) =>
    await call<undefined, ApiWorkOrder>('GET', `/workorders/${id}`, {
      ...opts,
    }),
  create: async (workorder, options) =>
    await call<ApiWorkOrderRequest, ApiWorkOrder[], CreateOptions>(
      'POST',
      `/workorders`,
      {
        ...opts,
        params: options,
        body: workorder,
      },
    ),
  update: async (id, workorder) =>
    await call<ApiWorkOrderRequest, ApiWorkOrder>('PUT', `/workorders/${id}`, {
      ...opts,
      body: workorder,
    }),
  delete: async (id) =>
    await call<undefined, ApiWorkOrder>('DELETE', `/workorders/${id}`, {
      ...opts,
    }),
  listEvents: async (workorder_id) =>
    await call<undefined, ApiWorkOrderEvent[]>(
      'GET',
      `/workorders/${workorder_id}/events`,
      { ...opts },
    ),
  createEvent: async (workorder_id, event, files) => {
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

    return await call<ApiWorkOrderEventClientRequest, ApiWorkOrderEvent>(
      'POST',
      `/workorders/${workorder_id}/events`,
      {
        ...opts,
        body: uploaded.length
          ? {
              ...event,
              data: {
                ...event.data,
                attachments: uploaded.map((upload) => ({
                  name: upload.name,
                  mime_type: upload.mime_type,
                  attachment: upload.id,
                })),
              },
            }
          : event,
      },
    );
  },
});
