import { ActionLink } from '@/components/UI/ActionLink'
import { subscriptionPath } from '@/data/subscriptionPlans'
import type { ComponentProps } from 'react'

type PurchaseLinkProps = Omit<
  ComponentProps<typeof ActionLink>,
  'to' | 'href'
> & {
  planId?: string
}

export function PurchaseLink({ planId, ...props }: PurchaseLinkProps) {
  return <ActionLink {...props} to={subscriptionPath(planId)} />
}
