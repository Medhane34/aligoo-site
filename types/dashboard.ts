
// src/types/dashboard.ts
export type ProposalStatus =
    | 'Not Opened'
    | 'Opened'
    | 'Accepted'
    | 'Rejected'
    | 'Expired'
    | 'Payment_pending'
    | 'Paid'

export interface ViewLog {
    timestamp: string
    event: string
    ip?: string
}

// src/types/dashboard.ts
export interface CurrentSelection {
    selectedPackage?: string
    selectedAddOns?: string[]
    totalPrice?: number
    _updatedAt?: string
    status?: ProposalStatus | null

}

export interface DashboardProposal {
    _id: string
    clientName: string | null
    clientPhone: string
    uniqueCode: string
    currentSelection: CurrentSelection | null
    expiresAt: string | null
    viewLogs: ViewLog[]
    _createdAt: string
    totalPrice?: number
    _updatedAt?: string
}

export interface TeamMemberSession {
    phone: string
    name: string
}