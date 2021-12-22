import call from '../call';

import type { MobilixClientOptions } from '../options';
import type { ApiCheckInPlanRequest, ApiCheckInPlan } from '../api';

export interface CheckInPlanOperations {
  list: () => Promise<ApiCheckInPlan[]>;
  get: (id: string) => Promise<ApiCheckInPlan>;
  create: (plan: ApiCheckInPlanRequest) => Promise<ApiCheckInPlan>;
  update: (id: string, plan: ApiCheckInPlanRequest) => Promise<ApiCheckInPlan>;
  delete: (id: string) => Promise<ApiCheckInPlan>;
}

export const checkInPlanOperations = (
  opts: MobilixClientOptions,
): CheckInPlanOperations => ({
  list: async () =>
    await call<undefined, ApiCheckInPlan[]>('GET', `/checkin_plans`, {
      ...opts,
    }),
  get: async (id) =>
    await call<undefined, ApiCheckInPlan>('GET', `/checkin_plans/${id}`, {
      ...opts,
    }),
  create: async (plan) =>
    await call<ApiCheckInPlanRequest, ApiCheckInPlan>(
      'POST',
      `/checkin_plans`,
      {
        ...opts,
        body: plan,
      },
    ),
  update: async (id, plan) =>
    await call<ApiCheckInPlanRequest, ApiCheckInPlan>(
      'PUT',
      `/checkin_plans/${id}`,
      {
        ...opts,
        body: plan,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiCheckInPlan>('DELETE', `/checkin_plans/${id}`, {
      ...opts,
    }),
});
