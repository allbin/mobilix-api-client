type ApiColumnSetRequest = {
  entity_type_id: string;
  columns: Array<string>;
};

type ApiColumnSet = {
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

type ApiContractorAgentRequest = {
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

type ApiContractorAgent = {
  id: string;
  /**
   * Contractor owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiContractorAgentRequest;

type ApiContractorRequest = {
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

type ApiContractor = {
  id: string;
  /**
   * Contractor owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiContractorRequest;

type ApiEntityChangeSetRequest = {
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

type ApiEntityChangeSet = {
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

type ApiEntityRequest = {
  /**
   * EntityType Identifier
   */
  entity_type_id: string;
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

type ApiEntitySchemaGroup = {
  /**
   * Group ID
   */
  id: number;
  /**
   * Group name
   */
  name: string;
};

type ApiEntitySchemaProp = {
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

type ApiEntitySchemaRequest = {
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
    translations: ApiEntitySchemaTranslations;
  };
};

type ApiEntitySchemaTranslations = {
  /**
   * Key-value dictionary of property IDs mapped to translations for the en-US locale
   */
  'en-US'?: Record<string, string>;
  /**
   * Key-value dictionary of property IDs mapped to translations for the sv-SE locale
   */
  'sv-SE'?: Record<string, string>;
};

type ApiEntitySchema = {
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

type ApiEntity = {
  id: string;
  /**
   * Entity owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiEntityRequest;

type ApiEntityTypeRequest = {
  name: string;
};

type ApiEntityType = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiEntityTypeRequest;

type ApiError = {
  /**
   * Error message
   */
  message: string;
};

type ApiFilterCondition = {
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

type ApiFilterSetRequest = {
  entity_type_id: string;
  filters: Array<ApiFilter>;
};

type ApiFilterSet = {
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

type ApiInstructionRequest = {
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

type ApiInstruction = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
} & ApiInstructionRequest;

type ApiMetadata = {
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

type ApiTagRequest = {
  name: string;
};

type ApiTag = {
  id: string;
  /**
   * Tag owner tenant ID
   */
  tenant_id: string;
  meta: ApiMetadata;
} & ApiTagRequest;

type ApiUserProfileRequest = {
  profile: Record<string, number | string | boolean | any[]>;
};

type ApiUserProfile = {
  id: string;
  /**
   * User ID
   */
  user_id: string;
  meta: ApiMetadata;
} & ApiUserProfileRequest;

type ApiValidationError = ApiError & {
  errors?: Array<ExpressValidationError>;
};

type ApiWorkOrderRequest = {
  /**
   * Entity type
   */
  entity_type_id: string;
  /**
   * Workorder instructions
   */
  description: string;
  tags: Array<string>;
  contractors: Array<string>;
  /**
   * ISO 8601 date time
   */
  due_at?: string;
  changesets?: Array<ApiEntityChangeSetRequest>;
  /**
   * User ID of assignee
   */
  assignee?: string;
};

type ApiWorkOrder = {
  id: string;
  tenant_id: string;
  meta: ApiMetadata;
  /**
   * Autogenerated WorkOrder title
   */
  title: string;
} & ApiWorkOrderRequest;

type ExpressValidationError = {
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
