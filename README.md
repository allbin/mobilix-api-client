# mobilix-api-client

### Example use
```typescript
const client = MobilixApiClient({
  baseUrl: 'https://api.mobilix.dev.allbin.se',
  token: () => getTokenPromise(),
})

const entityTypes = await client.entityTypes.list();
```
