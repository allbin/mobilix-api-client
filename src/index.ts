import { MobilixClientOptions } from './options';

import { entityTypeOperations, EntityTypeOperations } from './entity_types';
import {
  entitySchemaOperations,
  EntitySchemaOperations,
} from './entity_schemas';

interface IMobilixApiClient {
  entityTypes: EntityTypeOperations;
  entitySchemas: EntitySchemaOperations;
}

const MobilixApiClient = (opts: MobilixClientOptions): IMobilixApiClient => ({
  entityTypes: entityTypeOperations(opts),
  entitySchemas: entitySchemaOperations(opts),
});

export { MobilixApiClient };
export * from './api';
