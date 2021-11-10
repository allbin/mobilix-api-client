export type ApiAttachmentRequest = {
  /**
   * File name
   */
  name: string;
  /**
   * MIME-type
   */
  mime_type: string;
};

export type ApiAttachment = {
  id: string;
  tenant_id: string;
  /**
   * Uploader User ID
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiAttachmentRequest;

export type ApiColumnSetRequest = {
  entity_type_id: string;
  name: string;
  columns: Array<string>;
};

export type ApiColumnSet = {
  id: string;
  /**
   * ColumnSet owner tenant ID
   */
  tenant_id: string;
  /**
   * ColumnSet author user ID
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiColumnSetRequest;

export type ApiCommentEvent = {
  type: 'comment';
  data: {
    /**
     * Comment text
     */
    text?: string;
    attachments?: Array<{
      /**
       * MIME type
       */
      mime_type: string;
      /**
       * Attachment ID
       */
      attachment: string;
      /**
       * Filename or description
       */
      name?: string;
    }>;
  };
};

export type ApiContractorAgentRequest = {
  user_id: string;
  /**
   * The ID of the Contractor to which this user belongs
   */
  contractor_id: string;
  /**
   * Is this user an admin of the Contractor?
   */
  admin: boolean;
};

export type ApiContractorAgent = {
  id: string;
  /**
   * Contractor owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiContractorAgentRequest;

export type ApiContractorRequest = {
  name: string;
  /**
   * Contact email
   */
  email?: string;
  /**
   * Contact phone number (E.164 number)
   */
  phone?: string;
  /**
   * Multi-line contact address
   */
  address?: string;
  /**
   * Contact person name
   */
  contact_person?: string;
  /**
   * FilterSet ID
   */
  filterset_id?: string;
  /**
   * Contractor notes
   */
  notes?: string;
};

export type ApiContractor = {
  id: string;
  /**
   * Contractor owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiContractorRequest;

export type ApiEntityChangeSetEvent = {
  type: 'changeset';
  data: {
    changeset_id: string;
    prev_changeset_id?: string;
  };
};

export type ApiEntityChangeSetRequest = {
  /**
   * EntityChangeSet Identifier
   */
  entity_id: string;
  /**
   * Preceding EntityChangeSet
   */
  prev_changeset_id?: string;
  /**
   * Key-value dictionary based on EntitySchema for EntityType
   */
  properties: Record<
    string,
    boolean | number | string | Array<number> | Array<string>
  >;
};

export type ApiEntityChangeSet = {
  id: string;
  /**
   * ChangeSet owner tenant ID
   */
  tenant_id: string;
  /**
   * ChangeSet author
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiEntityChangeSetRequest;

export type ApiEntityErrorReportEvent = {
  type: 'error-report';
  data: {
    error_report_id: string;
    action: 'filed' | 'cleared';
  };
};

export type ApiEntityEventClientRequest = ApiCommentEvent;

export type ApiEntityEventRequestBase = {
  /**
   * ID of affected Entity
   */
  entity_id: string;
};

export type ApiEntityEventRequest = ApiEntityEventRequestBase &
  (
    | ApiCommentEvent
    | ApiEntityChangeSetEvent
    | ApiEntityWorkOrderStateEvent
    | ApiEntityErrorReportEvent
    | ApiEntityPoliceReportEvent
  );

export type ApiEntityEvent = {
  id: string;
  /**
   * User who caused the event
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiEntityEventRequest;

export type ApiEntityPoliceReportEvent = {
  type: 'police-report';
  data: {
    police_report_id: string;
    action: 'filed' | 'cleared';
  };
};

export type ApiEntityRequest = {
  /**
   * EntityType Identifier
   */
  entity_type_id: string;
  /**
   * Tenant-assigned ID. Only unique in combination with entity_type_id
   */
  local_id: string;
  /**
   * ChangeSet ID for the last applied changeset
   */
  changeset_head?: string;
  /**
   * Key-value dictionary based on EntitySchema for EntityType
   */
  properties: Record<
    string,
    boolean | number | string | Array<number> | Array<string>
  >;
};

export type ApiEntitySchemaGroup = {
  /**
   * Group ID
   */
  id: number;
  /**
   * Group name
   */
  name: string;
};

export type ApiEntitySchemaProp = {
  /**
   * Property key
   */
  key: string;
  /**
   * Property type
   */
  type:
    | 'array:number'
    | 'array:string'
    | 'boolean'
    | 'date'
    | 'enum'
    | 'number'
    | 'photo'
    | 'string';
  /**
   * Property display name
   */
  name: string;
  /**
   * Reference to EntitySchemaGroup of which this property is a member
   */
  group_id?: number;
  /**
   * Flag set to true if property may be modified by users
   */
  modifiable?: boolean;
  /**
   * If property type is enum, this field must exist and contain a list of acceptable values
   */
  alternatives?: Array<string>;
  /**
   * Information for Contractors from Transit Authority
   */
  help_text?: string;
  /**
   * URL referencing image to be presented together with help_text
   */
  help_image?: string;
};

export type ApiEntitySchemaRequest = {
  /**
   * Entity type
   */
  entity_type_id: string;
  definition: {
    /**
     * Array of EntitySchemaGroups
     */
    groups: Array<ApiEntitySchemaGroup>;
    /**
     * Array of EntitySchemaProps
     */
    properties: Array<ApiEntitySchemaProp>;
  };
};

export type ApiEntitySchema = {
  /**
   * Schema ID
   */
  id: string;
  /**
   * Schema owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiEntitySchemaRequest;

export type ApiEntity = {
  id: string;
  /**
   * Entity owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiEntityRequest;

export type ApiEntityTypeRequest = {
  name: string;
};

export type ApiEntityType = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiEntityTypeRequest;

export type ApiEntityWorkOrderStateEvent = {
  type: 'workorder:state';
  data: {
    workorder_id: string;
    state: ApiWorkOrderState;
  };
};

export type ApiErrorReportRequest = {
  entity_id: string;
  destination: string;
  property_key: string;
  /**
   * In case of enum properties, the report can be specifically for one of the alternatives
   */
  property_value?: string;
  /**
   * Description of error
   */
  message?: string;
};

export type ApiErrorReport = {
  id: string;
  /**
   * Contractor owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiErrorReportRequest;

export type ApiError = {
  /**
   * Error message
   */
  message: string;
};

export type ApiFilterConditionBase = {
  /**
   * EntitySchemaProp key
   */
  field: string;
};

export type ApiFilterConditionBooleanNoArgs = {
  type: 'boolean';
  operator: 'known' | 'unknown' | 'true' | 'false';
};

export type ApiFilterConditionDateTimeManyArgs = {
  type: 'date';
  operator: 'before' | 'after';
  value: Array<string>;
};

export type ApiFilterConditionDateTimeNoArgs = {
  type: 'date';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionDateTimeSingleArg = {
  type: 'date';
  operator: 'before' | 'after';
  value: string;
};

export type ApiFilterConditionEnumManyArgs = {
  type: 'enum';
  operator: 'none_of' | 'any_of';
  value: Array<string>;
};

export type ApiFilterConditionEnumNoArgs = {
  type: 'enum';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionEnumSingleArg = {
  type: 'enum';
  operator: 'eq' | 'neq' | 'matches' | 'not_matches';
  value: string;
};

export type ApiFilterConditionNumberArrayManyArgs = {
  type: 'array:number';
  operator: 'none_of' | 'any_of' | 'all_of';
  value: Array<number>;
};

export type ApiFilterConditionNumberArrayNoArgs = {
  type: 'array:number';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionNumberManyArgs = {
  type: 'number';
  operator: 'between' | 'not_between' | 'none_of' | 'any_of';
  value: Array<number>;
};

export type ApiFilterConditionNumberNoArgs = {
  type: 'number';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionNumberSingleArg = {
  type: 'number';
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte';
  value: number;
};

export type ApiFilterConditionPhotoNoArgs = {
  type: 'photo';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionStringArrayManyArgs = {
  type: 'array:string';
  operator: 'none_of' | 'any_of' | 'all_of';
  value: Array<string>;
};

export type ApiFilterConditionStringArrayNoArgs = {
  type: 'array:string';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionStringManyArgs = {
  type: 'string';
  operator: 'none_of' | 'any_of';
  value: Array<string>;
};

export type ApiFilterConditionStringNoArgs = {
  type: 'string';
  operator: 'known' | 'unknown';
};

export type ApiFilterConditionStringSingleArg = {
  type: 'string';
  operator: 'eq' | 'neq' | 'matches' | 'not_matches';
  value: string;
};

export type ApiFilterCondition = ApiFilterConditionBase &
  (
    | ApiFilterConditionBooleanNoArgs
    | ApiFilterConditionStringManyArgs
    | ApiFilterConditionStringNoArgs
    | ApiFilterConditionStringSingleArg
    | ApiFilterConditionEnumManyArgs
    | ApiFilterConditionEnumNoArgs
    | ApiFilterConditionEnumSingleArg
    | ApiFilterConditionNumberManyArgs
    | ApiFilterConditionNumberNoArgs
    | ApiFilterConditionNumberSingleArg
    | ApiFilterConditionDateTimeManyArgs
    | ApiFilterConditionDateTimeNoArgs
    | ApiFilterConditionDateTimeSingleArg
    | ApiFilterConditionPhotoNoArgs
    | ApiFilterConditionStringArrayNoArgs
    | ApiFilterConditionStringArrayManyArgs
    | ApiFilterConditionNumberArrayNoArgs
    | ApiFilterConditionNumberArrayManyArgs
  );

export type ApiFilterSetRequest = {
  entity_type_id: string;
  name: string;
  filters: Array<ApiFilter>;
};

export type ApiFilterSet = {
  id: string;
  /**
   * FilterSet owner tenant ID
   */
  tenant_id: string;
  /**
   * FilterSet author user ID
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiFilterSetRequest;

export type ApiFilter = Array<ApiFilterCondition>;

export type ApiLocation = {
  /**
   * Coordinate Reference System
   */
  crs: 'epsg:3021';
  /**
   * X coordinate in CRS
   */
  x: number;
  /**
   * Y coordinate in CRS
   */
  y: number;
};

export type ApiMetadata = {
  /**
   * ISO 8601 date time
   */
  created_at: string;
  /**
   * ISO 8601 date time
   */
  updated_at: string;
  /**
   * ISO 8601 date time
   */
  deleted_at?: string;
};

export type ApiPermission =
  | 'administrators:create'
  | 'administrators:delete'
  | 'contractors:add-admin'
  | 'contractors:add-agent'
  | 'contractors:create'
  | 'contractors:delete'
  | 'contractors:read'
  | 'contractors:update'
  | 'contractors:remove-admin'
  | 'contractors:remove-agent'
  | 'entities:create'
  | 'entities:delete'
  | 'entities:read'
  | 'entities:update'
  | 'entity-types:create'
  | 'error-reports:create'
  | 'instructions:create'
  | 'instructions:delete'
  | 'instructions:read'
  | 'instructions:update'
  | 'police-reports:create'
  | 'tags:create'
  | 'tags:update'
  | 'tags:delete'
  | 'users:read'
  | 'workorders:approve'
  | 'workorders:cancel'
  | 'workorders:create'
  | 'workorders:delete'
  | 'workorders:execute'
  | 'workorders:read'
  | 'workorders:update';

export type ApiTagRequest = {
  name: string;
  description?: string;
};

export type ApiTag = {
  id: string;
  /**
   * Tag owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiTagRequest;

export type ApiTenant = {
  /**
   * Tenant ID
   */
  id: string;
  /**
   * Tenant display name
   */
  name: string;
};

export type ApiUserContractor = {
  /**
   * Contractor ID
   */
  id: string;
  /**
   * User is admin for this Contractor
   */
  admin?: boolean;
};

export type ApiUserProfileRequest = {
  profile: Record<string, number | string | boolean | any[]>;
};

export type ApiUserProfile = {
  id: string;
  /**
   * User ID
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiUserProfileRequest;

export type ApiUser = {
  /**
   * User ID
   */
  user_id: string;
  meta: ApiMetadata;
  /**
   * User full name
   */
  name: string;
  /**
   * User email
   */
  email: string;
  /**
   * Is user an administrator?
   */
  admin?: boolean;
  contractors?: Array<ApiUserContractor>;
};

export type ApiValidationError = ApiError & {
  errors: Array<ExpressValidationError>;
};

export type ApiWorkOrderChangeSetEvent = {
  type: 'changeset';
  data: {
    entity_id: string;
    /**
     * Key-value dictionary based on EntitySchema for EntityType
     */
    properties: Record<
      string,
      boolean | number | string | Array<number> | Array<string>
    >;
  };
};

export type ApiWorkOrderConflictError = ApiError & {
  conflicts: Array<string>;
};

export type ApiWorkOrderEventClientRequest = ApiCommentEvent;

export type ApiWorkOrderEventRequestBase = {
  /**
   * ID of affected WorkOrder
   */
  workorder_id: string;
};

export type ApiWorkOrderEventRequest = ApiWorkOrderEventRequestBase &
  (
    | ApiCommentEvent
    | ApiWorkOrderChangeSetEvent
    | ApiWorkOrderStateEvent
    | ApiWorkOrderTagEvent
  );

export type ApiWorkOrderEvent = {
  id: string;
  /**
   * User who caused the event
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiWorkOrderEventRequest;

export type ApiWorkOrderInstructionRequest = {
  /**
   * Instruction title
   */
  title: string;
  /**
   * Paragraphs containing task instructions
   */
  texts: Array<string>;
  /**
   * List of tag ids
   */
  tags?: Array<string>;
};

export type ApiWorkOrderInstruction = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiWorkOrderInstructionRequest;

export type ApiWorkOrderRequest = {
  /**
   * Entity type
   */
  entity_type_id: string;
  /**
   * WorkOrder title
   */
  title: string;
  /**
   * WorkOrder instructions
   */
  description: string;
  state: ApiWorkOrderState;
  tags: Array<string>;
  contractors: Array<string>;
  entities: Array<string>;
  /**
   * EntityChangeSets by EntityID
   */
  entity_changesets: Record<string, ApiEntityChangeSetRequest>;
  /**
   * ISO 8601 date time
   */
  due_at?: string;
  /**
   * User ID of assignee
   */
  assignee?: string;
  location?: ApiLocation;
};

export type ApiWorkOrderStateEvent = {
  type: 'state';
  data: {
    state: ApiWorkOrderState;
    prev_state?: ApiWorkOrderState;
  };
};

export type ApiWorkOrderState =
  | 'created'
  | 'blocked'
  | 'accepted'
  | 'completed'
  | 'rejected'
  | 'approved'
  | 'cancelled';

export type ApiWorkOrderTagEvent = {
  type: 'tag';
  data: {
    tags_added?: Array<string>;
    tags_removed?: Array<string>;
  };
};

export type ApiWorkOrder = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiWorkOrderRequest;

export type ExpressValidationError = {
  /**
   * Error message
   */
  msg: string;
  /**
   * Parameter descriptor
   */
  param: string;
  /**
   * Offending parameter value
   */
  value: string;
  /**
   * Offending parameter location
   */
  location: 'body' | 'query' | 'params' | 'cookies' | 'headers';
  nestedErrors?: Array<ExpressValidationError>;
};
