export class ApiParseError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ApiParseError'
    }
}