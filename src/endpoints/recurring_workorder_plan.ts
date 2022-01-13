import call from '../call';

import type { MobilixClientOptions } from '../options';
import type {
  ApiRecurringWorkOrderPlanRequest,
  ApiRecurringWorkOrderPlan,
} from '../api';

export interface RecurringWorkOrderPlanOperations {
  list: () => Promise<ApiRecurringWorkOrderPlan[]>;
  get: (id: string) => Promise<ApiRecurringWorkOrderPlan>;
  create: (
    plan: ApiRecurringWorkOrderPlanRequest,
  ) => Promise<ApiRecurringWorkOrderPlan>;
  update: (
    id: string,
    plan: ApiRecurringWorkOrderPlanRequest,
  ) => Promise<ApiRecurringWorkOrderPlan>;
  delete: (id: string) => Promise<ApiRecurringWorkOrderPlan>;
}

export const recurringWorkOrderPlanOperations = (
  opts: MobilixClientOptions,
): RecurringWorkOrderPlanOperations => ({
  list: async () =>
    await call<undefined, ApiRecurringWorkOrderPlan[]>(
      'GET',
      `/recurring_workorder_plans`,
      {
        ...opts,
      },
    ),
  get: async (id) =>
    await call<undefined, ApiRecurringWorkOrderPlan>(
      'GET',
      `/recurring_workorder_plans/${id}`,
      {
        ...opts,
      },
    ),
  create: async (plan) =>
    await call<ApiRecurringWorkOrderPlanRequest, ApiRecurringWorkOrderPlan>(
      'POST',
      `/recurring_workorder_plans`,
      {
        ...opts,
        body: plan,
      },
    ),
  update: async (id, plan) =>
    await call<ApiRecurringWorkOrderPlanRequest, ApiRecurringWorkOrderPlan>(
      'PUT',
      `/recurring_workorder_plans/${id}`,
      {
        ...opts,
        body: plan,
      },
    ),
  delete: async (id) =>
    await call<undefined, ApiRecurringWorkOrderPlan>(
      'DELETE',
      `/recurring_workorder_plans/${id}`,
      {
        ...opts,
      },
    ),
});
