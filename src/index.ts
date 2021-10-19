import { MobilixClientOptions } from './options';

import {
  columnSetOperations,
  ColumnSetOperations,
  contractorAgentOperations,
  ContractorAgentOperations,
  contractorOperations,
  ContractorOperations,
  entityOperations,
  EntityOperations,
  entitySchemaOperations,
  EntitySchemaOperations,
  entityTypeOperations,
  EntityTypeOperations,
  filterSetOperations,
  FilterSetOperations,
  tagOperations,
  TagOperations,
  userProfileOperations,
  UserProfileOperations,
  workOrderOperations,
  WorkOrderOperations,
} from './endpoints';

interface IMobilixApiClient {
  columnSets: ColumnSetOperations;
  contractorAgents: ContractorAgentOperations;
  contractors: ContractorOperations;
  entities: EntityOperations;
  entitySchemas: EntitySchemaOperations;
  entityTypes: EntityTypeOperations;
  filterSets: FilterSetOperations;
  tags: TagOperations;
  userProfiles: UserProfileOperations;
  workOrders: WorkOrderOperations;
}

const MobilixApiClient = (opts: MobilixClientOptions): IMobilixApiClient => ({
  columnSets: columnSetOperations(opts),
  contractorAgents: contractorAgentOperations(opts),
  contractors: contractorOperations(opts),
  entities: entityOperations(opts),
  entitySchemas: entitySchemaOperations(opts),
  entityTypes: entityTypeOperations(opts),
  filterSets: filterSetOperations(opts),
  tags: tagOperations(opts),
  userProfiles: userProfileOperations(opts),
  workOrders: workOrderOperations(opts),
});

export { MobilixApiClient };
export * from './api';
