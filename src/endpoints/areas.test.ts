import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import axios, { AxiosRequestConfig } from 'axios';

import { areaOperations } from './areas';

import type { ApiAreaRequest, ApiFilterCondition } from '../api';

const area: ApiAreaRequest = {
  name: 'Depot',
  polygon: [
    [1, 2],
    [3, 4],
    [5, 6],
  ],
};

/** Runs a call through a real axios instance and hands back what it would send. */
const capture = async (
  run: (ops: ReturnType<typeof areaOperations>) => Promise<unknown>,
): Promise<{ config: AxiosRequestConfig; uri: string }> => {
  let sent: AxiosRequestConfig | undefined;
  const instance = axios.create({
    adapter: (config) => {
      sent = config;
      return Promise.resolve({
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    },
  });
  await run(areaOperations({ baseUrl: 'http://api.test', axios: instance }));
  assert.ok(sent, 'no request was sent');
  return { config: sent, uri: instance.getUri(sent) };
};

void describe('areas', () => {
  void it('lists areas', async () => {
    const { config, uri } = await capture((ops) => ops.list());
    assert.equal(config.method, 'get');
    assert.equal(config.url, '/areas');
    assert.equal(uri, 'http://api.test/areas');
  });

  void it('gets an area', async () => {
    const { config, uri } = await capture((ops) => ops.get('area-1'));
    assert.equal(config.method, 'get');
    assert.equal(config.url, '/areas/area-1');
    assert.equal(uri, 'http://api.test/areas/area-1');
  });

  void it('creates an area', async () => {
    const { config, uri } = await capture((ops) => ops.create(area));
    assert.equal(config.method, 'post');
    assert.equal(config.url, '/areas');
    assert.equal(uri, 'http://api.test/areas');
    assert.deepEqual(config.data, JSON.stringify(area));
  });

  void it('updates an area', async () => {
    const { config, uri } = await capture((ops) => ops.update('area-1', area));
    assert.equal(config.method, 'put');
    assert.equal(config.url, '/areas/area-1');
    assert.equal(uri, 'http://api.test/areas/area-1');
    assert.deepEqual(config.data, JSON.stringify(area));
  });

  void it('deletes an area', async () => {
    const { config, uri } = await capture((ops) => ops.delete('area-1'));
    assert.equal(config.method, 'delete');
    assert.equal(config.url, '/areas/area-1');
    assert.equal(uri, 'http://api.test/areas/area-1');
  });
});

void describe('area filter conditions', () => {
  void it('type-checks in_area and within_polygon location conditions', () => {
    const conditions: ApiFilterCondition[] = [
      {
        field: 'meta.location',
        type: 'location',
        operator: 'in_area',
        value: 'area-1',
      },
      {
        field: 'meta.location',
        type: 'location',
        operator: 'not_in_area',
        value: 'area-1',
      },
      {
        field: 'meta.location',
        type: 'location',
        operator: 'within_polygon',
        value: area.polygon,
      },
      {
        field: 'meta.location',
        type: 'location',
        operator: 'not_within_polygon',
        value: area.polygon,
      },
    ];
    assert.equal(conditions.length, 4);
  });
});
