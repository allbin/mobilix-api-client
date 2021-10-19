import querystring from 'querystring';

import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiContractorAgentRequest, ApiContractorAgent } from '../api';

export interface ContractorAgentOperations {
  list: (contractor_id?: string) => Promise<ApiContractorAgent[]>;
  get: (id: string) => Promise<ApiContractorAgent>;
  create: (agent: ApiContractorAgent) => Promise<ApiContractorAgent>;
  createMany: (
    agents: ApiContractorAgentRequest[],
  ) => Promise<ApiContractorAgent[]>;
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
      ? `?${querystring.stringify({ contractor_id })}`
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
    await call<ApiContractorAgentRequest[], ApiContractorAgent[]>(
      'POST',
      `/contractor_agents`,
      {
        ...opts,
        body: [agent],
      },
    ).then((r) => r[0]),
  createMany: async (agents) =>
    await call<ApiContractorAgentRequest[], ApiContractorAgent[]>(
      'POST',
      `/contractor_agents`,
      {
        ...opts,
        body: agents,
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
