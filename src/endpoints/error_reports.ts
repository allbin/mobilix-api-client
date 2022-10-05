import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiErrorReport, ApiErrorReportRequest } from '../api';

export interface ErrorReportOperations {
  list: (entity_id?: string) => Promise<ApiErrorReport[]>;
  get: (id: string) => Promise<ApiErrorReport>;
  create: (report: ApiErrorReportRequest) => Promise<ApiErrorReport>;
  delete: (id: string) => Promise<ApiErrorReport>;
}

export const errorReportOperations = (
  opts: MobilixClientOptions,
): ErrorReportOperations => ({
  list: async (entity_id) => {
    const qstring = entity_id
      ? `?${new URLSearchParams({ entity_id }).toString()}`
      : '';
    return await call<undefined, ApiErrorReport[]>(
      'GET',
      `/error_reports${qstring}`,
      {
        ...opts,
      },
    );
  },
  get: async (id) =>
    await call<undefined, ApiErrorReport>('GET', `/error_reports/${id}`, {
      ...opts,
    }),
  create: async (report) =>
    await call<ApiErrorReportRequest, ApiErrorReport>(
      'POST',
      `/error_reports`,
      {
        ...opts,
        body: report,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiErrorReport>('DELETE', `/error_reports/${id}`, {
      ...opts,
    }),
});
