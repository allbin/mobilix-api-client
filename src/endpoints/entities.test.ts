import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import axios, { AxiosRequestConfig } from 'axios';

import { entityOperations } from './entities';

/** Runs a call through a real axios instance and hands back what it would send. */
const capture = async (
  run: (ops: ReturnType<typeof entityOperations>) => Promise<unknown>,
): Promise<{ config: AxiosRequestConfig; uri: string }> => {
  let sent: AxiosRequestConfig | undefined;
  const instance = axios.create({
    adapter: (config) => {
      sent = config;
      return Promise.resolve({
        data: undefined,
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      });
    },
  });
  await run(entityOperations({ baseUrl: 'http://api.test', axios: instance }));
  assert.ok(sent, 'no request was sent');
  return { config: sent, uri: instance.getUri(sent) };
};

void describe('entities.createCheckIn', () => {
  void it('posts the result as a JSON body', async () => {
    const { config, uri } = await capture((ops) =>
      ops.createCheckIn('entity-1', { result: 'error_report' }),
    );
    assert.equal(config.method, 'post');
    assert.equal(uri, 'http://api.test/entities/entity-1/checkin');
    assert.equal(config.data, JSON.stringify({ result: 'error_report' }));
    assert.equal(config.headers?.['Content-Type'], 'application/json');
  });

  void it('posts no body when no request is given', async () => {
    const { config, uri } = await capture((ops) =>
      ops.createCheckIn('entity-1'),
    );
    assert.equal(config.method, 'post');
    assert.equal(uri, 'http://api.test/entities/entity-1/checkin');
    assert.equal(config.data, undefined);
  });
});
