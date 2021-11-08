import call from '../call';

import { MobilixClientOptions } from '../options';
import { ApiAttachment } from '../api';

export interface AttachmentOperations {
  create: (file: File) => Promise<ApiAttachment>;
}

export const attachmentOperations = (
  opts: MobilixClientOptions,
): AttachmentOperations => ({
  create: async (file) => {
    const data = new FormData();
    data.append('file', file);
    return await call<undefined, ApiAttachment>('POST', `/attachments`, {
      ...opts,
      form: data,
    });
  },
});
