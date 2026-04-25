/**
 * Component interface types for animation and exposed component refs.
 */

import type TypewriterText from '@/components/ui/TypewriterText.vue'
import type ConfirmationList from '@/components/ui/ConfirmationList.vue'
import type ConfirmButton from '@/components/ui/ConfirmButton.vue'
import type NavPath from '@/components/ui/NavPath.vue'

/**
 * Interface for components that expose a start() animation method.
 */
export interface AnimationExposed {
  start: () => Promise<void>
}

/**
 * Type for TypewriterText component ref.
 */
export type TypewriterTextExposed = InstanceType<typeof TypewriterText>

/**
 * Type for ConfirmationList component ref.
 */
export type ConfirmationListExposed = InstanceType<typeof ConfirmationList>

/**
 * Type for ConfirmButton component ref.
 */
export type ConfirmButtonExposed = InstanceType<typeof ConfirmButton>

/**
 * Type for NavPath component ref.
 */
export type NavPathExposed = InstanceType<typeof NavPath>

/**
 * Groups component refs for a specific message index.
 */
export interface ComponentRefs {
  typewriters: TypewriterTextExposed[]
  confirmationList: ConfirmationListExposed | null
  confirmButton: ConfirmButtonExposed | null
  navPath: NavPathExposed | null
}

/**
 * Tracks visibility state for animated components.
 */
export interface VisibilityState {
  confirmationList: boolean
  confirmButton: boolean
  navPath: boolean
}
