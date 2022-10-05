import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiContractorAgent, ApiContractorAgentRequest } from '../api';

export interface ContractorAgentOperations {
  list: (contractor_id?: string) => Promise<ApiContractorAgent[]>;
  get: (id: string) => Promise<ApiContractorAgent>;
  create: (agent: ApiContractorAgentRequest) => Promise<ApiContractorAgent>;
  update: (
    id: string,
    agent: ApiContractorAgentRequest,
  ) => Promise<ApiContractorAgent>;
  delete: (id: string) => Promise<ApiContractorAgent>;
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
  create: async (agent) =>
    await call<ApiContractorAgentRequest, ApiContractorAgent>(
      'POST',
      `/contractor_agents`,
      {
        ...opts,
        body: agent,
      },
    ),
  update: async (id: string, agent: ApiContractorAgentRequest) =>
    await call<ApiContractorAgentRequest, ApiContractorAgent>(
      'PUT',
      `/contractor_agents/${id}`,
      {
        ...opts,
        body: agent,
      },
    ),
  delete: async (id: string) =>
    await call<undefined, ApiContractorAgent>(
      'DELETE',
      `/contractor_agents/${id}`,
      { ...opts },
    ),
});
