export class AppError extends Error {
    public readonly code: string;

    constructor(message: string, code: string) {
        super(message);

        this.name = "AppError";
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}