# mobilix-api-client

### Example use
```typescript
const client = MobilixApiClient({
  baseUrl: 'https://api.mobilix.dev.allbin.se',
  token: () => getTokenPromise(),
})

const entityTypes = await client.entityTypes.list();
```

### generate new types from mobilix-api

Adjust path to `api.d.ts` to fit your own machine

```bash
cat ../mobilix-api/src/types/api.d.ts | sed -e 's/^type/export type/g' > src/api.ts
```
