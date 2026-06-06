export abstract class IPasswordHasher {
    abstract hash(password: string): Promise<string>
}