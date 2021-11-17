import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiTenantInvitationRequest, ApiTenantInvitation } from '../api';

export interface InvitationOperations {
  list: () => Promise<ApiTenantInvitation[]>;
  create: (email: string) => Promise<ApiTenantInvitation>;
}

export const invitationOperations = (
  opts: MobilixClientOptions,
): InvitationOperations => ({
  list: async () =>
    await call<undefined, ApiTenantInvitation[]>('GET', `/invitations`, {
      ...opts,
    }),
  create: async (email: string) =>
    await call<ApiTenantInvitationRequest, ApiTenantInvitation>(
      'POST',
      `/invitations`,
      { ...opts, body: { email } },
    ),
});
