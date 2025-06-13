export interface StatusCardGridProps {
    data?: StatusApiResponse,
    isLoading? : boolean
}

export interface StatusApiResponse {
    status: boolean
    response: {
        pending: number
        in_progress: number
        completed: number
        cancelled: number
    }
    message: string
}