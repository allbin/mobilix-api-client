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

export type ApiEntityEventClientRequest = ApiCommentEvent;

export type ApiEntityEventRequestBase = {
  /**
   * ID of affected Entity
   */
  entity_id: string;
};

export type ApiEntityEventRequest = ApiEntityEventRequestBase &
  (ApiCommentEvent | ApiEntityChangeSetEvent | ApiEntityWorkOrderStateEvent);

export type ApiEntityEvent = {
  id: string;
  /**
   * User who caused the event
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiEntityEventRequest;

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
    state:
      | 'created'
      | 'blocked'
      | 'accepted'
      | 'completed'
      | 'rejected'
      | 'approved'
      | 'cancelled';
  };
};

export type ApiError = {
  /**
   * Error message
   */
  message: string;
};

export type ApiFilterCondition = {
  /**
   * EntitySchemaProp key
   */
  field: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'enum'
    | 'array:number'
    | 'array:string';
  operator:
    | 'known'
    | 'unknown'
    | 'true'
    | 'false'
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'none_of'
    | 'any_of'
    | 'all_of'
    | 'between'
    | 'not_between'
    | 'matches'
    | 'not_matches'
    | 'before'
    | 'after';
  value?: string | number | boolean | Array<number> | Array<string>;
};

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

export type ApiInstructionRequest = {
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

export type ApiInstruction = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiInstructionRequest;

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
  contractors?: Array<string>;
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
  (ApiCommentEvent | ApiWorkOrderChangeSetEvent | ApiWorkOrderStateEvent);

export type ApiWorkOrderEvent = {
  id: string;
  /**
   * User who caused the event
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiWorkOrderEventRequest;

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
  /**
   * WorkOrder current state
   */
  state:
    | 'created'
    | 'blocked'
    | 'accepted'
    | 'completed'
    | 'rejected'
    | 'approved'
    | 'cancelled';
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
    state:
      | 'created'
      | 'blocked'
      | 'accepted'
      | 'completed'
      | 'rejected'
      | 'approved'
      | 'cancelled';
    prev_state?:
      | 'created'
      | 'blocked'
      | 'accepted'
      | 'completed'
      | 'rejected'
      | 'approved'
      | 'cancelled';
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
