import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import axios, { AxiosRequestConfig } from 'axios';

import { workOrderOperations } from './workorders';

import type { ApiWorkOrderRequest } from '../api';

const workorder: ApiWorkOrderRequest = {
  entity_type_id: 'entity-type-1',
  title: 'Fix the sign',
  description: '',
  state: 'created',
  tags: [],
  contractors: [],
  entities: ['entity-1'],
  entity_changesets: {},
};

/** Runs a call through a real axios instance and hands back what it would send. */
const capture = async (
  run: (ops: ReturnType<typeof workOrderOperations>) => Promise<unknown>,
): Promise<{ config: AxiosRequestConfig; uri: string }> => {
  let sent: AxiosRequestConfig | undefined;
  const instance = axios.create({
    adapter: (config) => {
      sent = config;
      return Promise.resolve({
        data: [],
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      });
    },
  });
  await run(
    workOrderOperations({ baseUrl: 'http://api.test', axios: instance }),
  );
  assert.ok(sent, 'no request was sent');
  return { config: sent, uri: instance.getUri(sent) };
};

void describe('workOrders.create', () => {
  void it('sends require_match next to auto_assign as query parameters', async () => {
    const { config, uri } = await capture((ops) =>
      ops.create(workorder, { auto_assign: true, require_match: true }),
    );
    assert.equal(config.method, 'post');
    assert.equal(config.url, '/workorders');
    assert.deepEqual(config.params, { auto_assign: true, require_match: true });
    assert.equal(
      uri,
      'http://api.test/workorders?auto_assign=true&require_match=true',
    );
    assert.deepEqual(config.data, JSON.stringify(workorder));
  });

  void it('sends require_match=false when asked to', async () => {
    const { uri } = await capture((ops) =>
      ops.create(workorder, { auto_assign: true, require_match: false }),
    );
    assert.equal(
      uri,
      'http://api.test/workorders?auto_assign=true&require_match=false',
    );
  });

  void it('sends no query parameters when no options are given', async () => {
    const { config, uri } = await capture((ops) => ops.create(workorder));
    assert.equal(config.params, undefined);
    assert.equal(uri, 'http://api.test/workorders');
  });
});
