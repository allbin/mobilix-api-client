import call from '../call';

import { MobilixClientOptions } from '../options';
import {
  ApiUserInvitationRequest,
  ApiUserInvitation,
  ApiUserInvitationUpdateRequest,
} from '../api';

export interface InvitationOperations {
  list: () => Promise<ApiUserInvitation[]>;
  create: (invitation: ApiUserInvitationRequest) => Promise<ApiUserInvitation>;
  update: (
    invitation_id: string,
    invitation: ApiUserInvitationUpdateRequest,
  ) => Promise<ApiUserInvitation>;
  remove: (invitation_id: string) => Promise<void>;
}

export const invitationOperations = (
  opts: MobilixClientOptions,
): InvitationOperations => ({
  list: async () =>
    await call<undefined, ApiUserInvitation[]>('GET', `/invitations`, {
      ...opts,
    }),
  create: async (invitation) =>
    await call<ApiUserInvitationRequest, ApiUserInvitation>(
      'POST',
      `/invitations`,
      { ...opts, body: invitation },
    ),
  update: async (invitation_id, invitation) =>
    await call<ApiUserInvitationUpdateRequest, ApiUserInvitation>(
      'PUT',
      `/invitations/${invitation_id}`,
      { ...opts, body: invitation },
    ),
  remove: async (invitation_id) =>
    await call<undefined, void>('DELETE', `/invitations/${invitation_id}`, {
      ...opts,
    }),
});
