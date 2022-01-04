import call from '../call';

import { MobilixClientOptions } from '../options';

export interface RebusOperations {
  upload: (file: File) => Promise<void>;
}

export const rebusOperations = (
  opts: MobilixClientOptions,
): RebusOperations => ({
  upload: async (file) => {
    const data = new FormData();
    data.append('file', file);
    return await call<undefined, undefined>('POST', `/rebus`, {
      ...opts,
      form: data,
    });
  },
});
