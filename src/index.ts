import { MobilixClientOptions } from './options';

import {
  columnSetOperations,
  ColumnSetOperations,
  contractorAgentOperations,
  ContractorAgentOperations,
  entitySchemaOperations,
  EntitySchemaOperations,
  entityTypeOperations,
  EntityTypeOperations,
  workOrderOperations,
  WorkOrderOperations,
} from './endpoints';

interface IMobilixApiClient {
  columnSets: ColumnSetOperations;
  contractorAgents: ContractorAgentOperations;
  entitySchemas: EntitySchemaOperations;
  entityTypes: EntityTypeOperations;
  workOrders: WorkOrderOperations;
}

const MobilixApiClient = (opts: MobilixClientOptions): IMobilixApiClient => ({
  columnSets: columnSetOperations(opts),
  contractorAgents: contractorAgentOperations(opts),
  entitySchemas: entitySchemaOperations(opts),
  entityTypes: entityTypeOperations(opts),
  workOrders: workOrderOperations(opts),
});

export { MobilixApiClient };
export * from './api';
