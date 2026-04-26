/**
 * Triage API Service
 * Handles communication with backend /triager/* endpoints
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// ============================================================================
// Request/Response Types
// ============================================================================

export interface CollectConditionRequest {
  description_from_user: string
}

export interface StructuredCondition {
  symptoms: string[]
  body_parts: string
  description: string
  duration: string
  severity: string
  other_relevant_info: string[]
}

export interface CollectConditionResponse {
  success: boolean
  data?: {
    structured_condition: StructuredCondition
  }
  error?: string
}

export interface SelectClinicRequest {
  body_parts: string
  duration: string
  severity: string
  description: string
  other_relevant_info?: string[]
}

export interface SelectClinicResponse {
  success: boolean
  data?: {
    clinic_id: string
  }
  error?: string
}

export interface CollectRequirementRequest {
  description_from_user: string
}

export interface RequirementSummary {
  when: string
  what: string
}

export interface CollectRequirementResponse {
  success: boolean
  data?: {
    requirements: RequirementSummary[]
  }
  error?: string
}

export interface PatchRouteRequest {
  destination_clinic_id: string
  requirement_summary: {
    when: string
    what: string
  }[]
  origin_route: string[]
}

export interface PatchRouteResponse {
  success: boolean
  data?: {
    patched_route: string[]
    estimated_wait_time: number
  }
  error?: string
}

// ============================================================================
// API Functions
// ============================================================================

async function apiPost<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export async function collectCondition(
  description: string,
  previousConclusions: string[] = []
): Promise<CollectConditionResponse> {
  try {
    // Backend returns raw condition without wrapper
    const raw = await apiPost<{
      body_parts: string
      description: string
      duration: string
      severity: string
      other_relevant_info: string[]
    }>('/triager/collect_condition', {
      description_from_user: description,
      previous_conclusions: previousConclusions,
    })

    // Transform to wrapped format for consistency with other API functions
    if (raw.body_parts || raw.description) {
      return {
        success: true,
        data: {
          structured_condition: {
            body_parts: raw.body_parts,
            symptoms: raw.body_parts ? [raw.body_parts] : [],
            description: raw.description,
            duration: raw.duration,
            severity: raw.severity,
            other_relevant_info: raw.other_relevant_info || [],
          },
        },
      }
    }

    return { success: false, error: 'Invalid response from server' }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    console.error('[TriageApi] collectCondition failed:', message)
    return { success: false, error: message }
  }
}

export async function selectClinic(
  bodyParts: string,
  duration: string,
  severity: string,
  description: string,
  otherRelevantInfo?: string[]
): Promise<SelectClinicResponse> {
  try {
    // Backend returns raw clinic data directly (not wrapped in success/data envelope)
    const raw = await apiPost<{
      clinic_id: string
    }>('/triager/select_clinic', {
      body_parts: bodyParts,
      duration,
      severity,
      description,
      other_relevant_info: otherRelevantInfo || [],
    })

    if (!raw.clinic_id) {
      console.error('[TriageApi] Invalid response: missing clinic data', raw)
      return { success: false, error: 'Invalid response from server' }
    }

    return {
      success: true,
      data: {
        clinic_id: raw.clinic_id,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    console.error('[TriageApi] selectClinic failed:', message)
    return { success: false, error: message }
  }
}

export async function collectRequirement(
  description: string
): Promise<CollectRequirementResponse> {
  try {
    // Backend returns raw requirements directly
    const raw = await apiPost<{
      requirements: RequirementSummary[]
    }>('/triager/collect_requirement', { description_from_user: description })

    if (!raw.requirements) {
      console.error('[TriageApi] Invalid response: missing requirements', raw)
      return { success: false, error: 'Invalid response from server' }
    }

    return {
      success: true,
      data: {
        requirements: raw.requirements,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    console.error('[TriageApi] collectRequirement failed:', message)
    return { success: false, error: message }
  }
}

export async function patchRoute(
  destinationClinicId: string,
  requirementSummary: RequirementSummary[],
  originRoute: string[]
): Promise<PatchRouteResponse> {
  try {
    // Backend returns raw route data directly
    const raw = await apiPost<{
      patched_route: string[]
    }>('/triager/patch_route', {
      destination_clinic_id: destinationClinicId,
      requirement_summary: requirementSummary,
      origin_route: originRoute,
    })

    if (!raw.patched_route) {
      console.error('[TriageApi] Invalid response: missing patched_route', raw)
      return { success: false, error: 'Invalid response from server' }
    }

    return {
      success: true,
      data: {
        patched_route: raw.patched_route,
        estimated_wait_time: 0, // Backend doesn't return this yet
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error'
    console.error('[TriageApi] patchRoute failed:', message)
    return { success: false, error: message }
  }
}
