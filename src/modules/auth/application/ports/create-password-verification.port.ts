export abstract class IPasswordVerifier {
    abstract verify(plain: string, hash: string): Promise<boolean>;   
}