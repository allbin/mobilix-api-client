import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiTenantInvitationRequest, ApiTenantInvitation } from '../api';

export interface InvitationOperations {
  list: () => Promise<ApiTenantInvitation[]>;
  create: (
    invitation: ApiTenantInvitationRequest,
  ) => Promise<ApiTenantInvitation>;
}

export const invitationOperations = (
  opts: MobilixClientOptions,
): InvitationOperations => ({
  list: async () =>
    await call<undefined, ApiTenantInvitation[]>('GET', `/invitations`, {
      ...opts,
    }),
  create: async (invitation) =>
    await call<ApiTenantInvitationRequest, ApiTenantInvitation>(
      'POST',
      `/invitations`,
      { ...opts, body: { email: invitation.email } },
    ),
});
