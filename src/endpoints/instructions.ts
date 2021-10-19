import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiInstructionRequest, ApiInstruction } from '../api';

export interface InstructionOperations {
  list: () => Promise<ApiInstruction[]>;
  get: (id: string) => Promise<ApiInstruction>;
  create: (instruction: ApiInstructionRequest) => Promise<ApiInstruction>;
  update: (
    id: string,
    instruction: ApiInstructionRequest,
  ) => Promise<ApiInstruction>;
  delete: (id: string) => Promise<ApiInstruction>;
}

export const instructionOperations = (
  opts: MobilixClientOptions,
): InstructionOperations => ({
  list: async () =>
    await call<undefined, ApiInstruction[]>('GET', `/instructions`, {
      ...opts,
    }),
  get: async (id) =>
    await call<undefined, ApiInstruction>('GET', `/instructions/${id}`, {
      ...opts,
    }),
  create: async (instruction) =>
    await call<ApiInstructionRequest, ApiInstruction>('POST', `/instructions`, {
      ...opts,
      body: instruction,
    }),
  update: async (id, instruction) =>
    await call<ApiInstructionRequest, ApiInstruction>(
      'PUT',
      `/instructions/${id}`,
      { ...opts, body: instruction },
    ),
  delete: async (id) =>
    await call<undefined, ApiInstruction>('DELETE', `/instructions/${id}`, {
      ...opts,
    }),
});
