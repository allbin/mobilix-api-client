import { MobilixClientOptions } from './options';

import {
  attachmentOperations,
  AttachmentOperations,
  checkInPlanOperations,
  CheckInPlanOperations,
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
  errorReportOperations,
  ErrorReportOperations,
  featureLicenseOperations,
  FeatureLicenseOperations,
  filterSetOperations,
  FilterSetOperations,
  invitationOperations,
  InvitationOperations,
  rebusOperations,
  RebusOperations,
  recurringWorkOrderPlanOperations,
  RecurringWorkOrderPlanOperations,
  tagOperations,
  TagOperations,
  tenantOperations,
  TenantOperations,
  userOperations,
  UserOperations,
  userProfileOperations,
  UserProfileOperations,
  workOrderOperations,
  WorkOrderOperations,
  workOrderInstructionOperations,
  WorkOrderInstructionOperations,
} from './endpoints';

interface IMobilixApiClient {
  attachments: AttachmentOperations;
  checkInPlans: CheckInPlanOperations;
  columnSets: ColumnSetOperations;
  contractorAgents: ContractorAgentOperations;
  contractors: ContractorOperations;
  entities: EntityOperations;
  entitySchemas: EntitySchemaOperations;
  entityTypes: EntityTypeOperations;
  errorReports: ErrorReportOperations;
  featureLicenses: FeatureLicenseOperations;
  filterSets: FilterSetOperations;
  invitations: InvitationOperations;
  rebus: RebusOperations;
  recurringWorkOrderPlans: RecurringWorkOrderPlanOperations;
  tags: TagOperations;
  tenants: TenantOperations;
  users: UserOperations;
  userProfiles: UserProfileOperations;
  workOrders: WorkOrderOperations;
  workOrderInstructions: WorkOrderInstructionOperations;
}

const MobilixApiClient = (opts: MobilixClientOptions): IMobilixApiClient => ({
  attachments: attachmentOperations(opts),
  checkInPlans: checkInPlanOperations(opts),
  columnSets: columnSetOperations(opts),
  contractorAgents: contractorAgentOperations(opts),
  contractors: contractorOperations(opts),
  entities: entityOperations(opts),
  entitySchemas: entitySchemaOperations(opts),
  entityTypes: entityTypeOperations(opts),
  errorReports: errorReportOperations(opts),
  featureLicenses: featureLicenseOperations(opts),
  filterSets: filterSetOperations(opts),
  invitations: invitationOperations(opts),
  rebus: rebusOperations(opts),
  recurringWorkOrderPlans: recurringWorkOrderPlanOperations(opts),
  tags: tagOperations(opts),
  tenants: tenantOperations(opts),
  users: userOperations(opts),
  userProfiles: userProfileOperations(opts),
  workOrders: workOrderOperations(opts),
  workOrderInstructions: workOrderInstructionOperations(opts),
});

export { MobilixApiClient, IMobilixApiClient };
export * from './api';
