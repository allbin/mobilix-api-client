import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiContractorAgent } from '../api';

export interface ContractorAgentOperations {
  list: (contractor_id?: string) => Promise<ApiContractorAgent[]>;
  get: (id: string) => Promise<ApiContractorAgent>;
}

export const contractorAgentOperations = (
  opts: MobilixClientOptions,
): ContractorAgentOperations => ({
  list: async (contractor_id) => {
    const qstring = contractor_id
      ? `?${new URLSearchParams({ contractor_id }).toString()}`
      : '';
    return await call<undefined, ApiContractorAgent[]>(
      'GET',
      `/contractor_agents${qstring}`,
      { ...opts },
    );
  },
  get: async (id) =>
    await call<undefined, ApiContractorAgent>(
      'GET',
      `/contractor_agents/${id}`,
      {
        ...opts,
      },
    ),
});
