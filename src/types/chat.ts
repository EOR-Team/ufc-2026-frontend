/**
 * Chat domain types for the triage conversation system.
 */

/**
 * Represents a confirmation list item with label and value.
 */
export interface ConfirmationItem {
  label: string
  value: string
}

/**
 * Content block types that can appear in a chat message.
 * - string: Plain text content
 * - { type: 'confirmation-list', items }: A list of confirmation items
 * - { type: 'confirm-button' }: A confirmation action button
 */
export type ContentBlock =
  | string
  | { type: 'confirmation-list'; items: ConfirmationItem[] }
  | { type: 'confirm-button' }

/**
 * Represents a message in the chat conversation.
 */
export interface ChatMessage {
  type: 'bot' | 'user'
  content: ContentBlock[]
}
