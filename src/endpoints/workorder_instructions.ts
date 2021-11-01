import call from '../call';

import { MobilixClientOptions } from '../options';
import {
  ApiWorkOrderInstructionRequest,
  ApiWorkOrderInstruction,
} from '../api';

export interface WorkOrderInstructionOperations {
  list: () => Promise<ApiWorkOrderInstruction[]>;
  get: (id: string) => Promise<ApiWorkOrderInstruction>;
  create: (
    instruction: ApiWorkOrderInstructionRequest,
  ) => Promise<ApiWorkOrderInstruction>;
  update: (
    id: string,
    instruction: ApiWorkOrderInstructionRequest,
  ) => Promise<ApiWorkOrderInstruction>;
  delete: (id: string) => Promise<ApiWorkOrderInstruction>;
}

export const workOrderInstructionOperations = (
  opts: MobilixClientOptions,
): WorkOrderInstructionOperations => ({
  list: async () =>
    await call<undefined, ApiWorkOrderInstruction[]>(
      'GET',
      `/workorder_instructions`,
      {
        ...opts,
      },
    ),
  get: async (id) =>
    await call<undefined, ApiWorkOrderInstruction>(
      'GET',
      `/workorder_instructions/${id}`,
      {
        ...opts,
      },
    ),
  create: async (instruction) =>
    await call<ApiWorkOrderInstructionRequest, ApiWorkOrderInstruction>(
      'POST',
      `/workorder_instructions`,
      {
        ...opts,
        body: instruction,
      },
    ),
  update: async (id, instruction) =>
    await call<ApiWorkOrderInstructionRequest, ApiWorkOrderInstruction>(
      'PUT',
      `/workorder_instructions/${id}`,
      { ...opts, body: instruction },
    ),
  delete: async (id) =>
    await call<undefined, ApiWorkOrderInstruction>(
      'DELETE',
      `/workorder_instructions/${id}`,
      {
        ...opts,
      },
    ),
});
