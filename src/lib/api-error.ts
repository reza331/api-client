export class ApiError extends Error {

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.name = 'ApiError'
    }

    status: number

}