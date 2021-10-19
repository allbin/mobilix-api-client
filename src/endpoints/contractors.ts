import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiContractorRequest, ApiContractor } from '../api';

export interface ContractorOperations {
  list: () => Promise<ApiContractor[]>;
  get: (id: string) => Promise<ApiContractor>;
  create: (contractor: ApiContractorRequest) => Promise<ApiContractor>;
  update: (
    id: string,
    contractor: ApiContractorRequest,
  ) => Promise<ApiContractor>;
  delete: (id: string) => Promise<ApiContractor>;
}

export const contractorOperations = (
  opts: MobilixClientOptions,
): ContractorOperations => ({
  list: async () =>
    await call<undefined, ApiContractor[]>('GET', `/contractors`, { ...opts }),
  get: async (id) =>
    await call<undefined, ApiContractor>('GET', `/contractors/${id}`, {
      ...opts,
    }),
  create: async (contractor) =>
    await call<ApiContractorRequest, ApiContractor>('POST', `/contractors`, {
      ...opts,
      body: contractor,
    }),
  update: async (id, contractor) =>
    await call<ApiContractorRequest, ApiContractor>(
      'PUT',
      `/contractors/${id}`,
      { ...opts, body: contractor },
    ),
  delete: async (id) =>
    await call<undefined, ApiContractor>('DELETE', `/contractors/${id}`, {
      ...opts,
    }),
});
