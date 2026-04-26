/**
 * Conversation State Machine
 * Manages the triage conversation flow states
 */

import type { StructuredCondition } from '@/services/triageApi'

export enum ConversationState {
  COLLECTING_CONDITION = 'COLLECTING_CONDITION',
  CONFIRMING_CONDITION = 'CONFIRMING_CONDITION',
  SELECTING_CLINIC = 'SELECTING_CLINIC',
  CONFIRMING_ROUTE = 'CONFIRMING_ROUTE',
  NAVIGATING = 'NAVIGATING',
}

// Define valid state transitions
const STATE_TRANSITIONS: Record<ConversationState, ConversationState[]> = {
  [ConversationState.COLLECTING_CONDITION]: [ConversationState.CONFIRMING_CONDITION],
  [ConversationState.CONFIRMING_CONDITION]: [ConversationState.SELECTING_CLINIC, ConversationState.COLLECTING_CONDITION],
  [ConversationState.SELECTING_CLINIC]: [ConversationState.CONFIRMING_ROUTE],
  [ConversationState.CONFIRMING_ROUTE]: [ConversationState.CONFIRMING_ROUTE, ConversationState.NAVIGATING],
  [ConversationState.NAVIGATING]: [],
}

export interface ConversationContext {
  state: ConversationState
  condition?: StructuredCondition
  clinicId?: string
  clinicName?: string
  route?: string[]
  requirements?: { when: string; what: string }[]
  estimatedWaitTime?: number
  conclusions: string[]
}

/**
 * Format a StructuredCondition into a human-readable string for previous_conclusions.
 * Used when sending history to backend API.
 */
export function formatConditionForConclusion(condition: StructuredCondition): string {
  const parts = [
    condition.description || condition.symptoms?.join('、'),
    condition.body_parts && `部位：${condition.body_parts}`,
    condition.duration && `持续时间：${condition.duration}`,
    condition.severity && `程度：${condition.severity}`,
  ].filter(Boolean)
  return parts.join('；')
}

/**
 * Get the last N conclusions for API calls.
 * Returns up to maxItems, preferring the most recent entries.
 */
export function getRecentConclusions(conclusions: string[], maxItems: number = 3): string[] {
  return conclusions.slice(-maxItems)
}

export function canTransition(from: ConversationState, to: ConversationState): boolean {
  const allowed = STATE_TRANSITIONS[from]
  return allowed.includes(to)
}

export function transition(
  current: ConversationState,
  next: ConversationState
): ConversationState {
  if (!canTransition(current, next)) {
    if (import.meta.env.DEV) {
      console.warn(`[TriageState] Invalid transition: ${current} -> ${next}`)
    }
    return current
  }

  if (import.meta.env.DEV) {
    console.log(`[TriageState] ${current} -> ${next}`)
  }

  return next
}

export function getInitialContext(): ConversationContext {
  return {
    state: ConversationState.COLLECTING_CONDITION,
    conclusions: [],
  }
}
