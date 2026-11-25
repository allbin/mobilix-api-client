import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import axios, { AxiosRequestConfig } from 'axios';

import { entityOperations } from './entities';

import type { ApiEntity, ApiEntityRequest } from '../api';

const stop: ApiEntityRequest = {
  entity_type_id: 'type-1',
  source_id: '1234-A',
  properties: {
    'meta.name': 'Centralstationen',
    'meta.location': [16.5, 59.6],
  },
};

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

void describe('entities.create', () => {
  void it('posts the entity request as a JSON body', async () => {
    const { config, uri } = await capture((ops) => ops.create(stop));
    assert.equal(config.method, 'post');
    assert.equal(config.url, '/entities');
    assert.equal(uri, 'http://api.test/entities');
    assert.equal(config.data, JSON.stringify(stop));
    assert.equal(config.headers?.['Content-Type'], 'application/json');
  });
});

void describe('entities.delete', () => {
  void it('sends DELETE for the entity id without a body', async () => {
    const { config, uri } = await capture((ops) => ops.delete('entity-1'));
    assert.equal(config.method, 'delete');
    assert.equal(config.url, '/entities/entity-1');
    assert.equal(uri, 'http://api.test/entities/entity-1');
    assert.equal(config.data, undefined);
  });
});

void describe('ApiEntity.origin', () => {
  void it('is import or manual and set on every entity', () => {
    // Compile-time check: the server always sets origin, so the type must
    // require it and accept only the two values.
    const origins: Array<ApiEntity['origin']> = ['import', 'manual'];
    const required: 'import' | 'manual' = origins[0];
    assert.deepEqual(origins, ['import', 'manual']);
    assert.equal(required, 'import');
  });
});

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
    // Whatever header axios adds to an empty POST is axios's own default and
    // unchanged from 0.46.0; createCheckIn must not turn it into JSON.
    assert.notEqual(config.headers?.['Content-Type'], 'application/json');
  });
});
