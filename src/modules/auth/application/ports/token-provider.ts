export abstract class ITokenProvider {
    abstract generateToken(payload: object, expiresIn?: string | number): Promise<string>;
    abstract verifyToken(token: string): Promise<object | string>;
}