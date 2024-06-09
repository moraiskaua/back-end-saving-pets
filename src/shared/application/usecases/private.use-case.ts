export interface PrivateUseCase<Input, Output> {
  execute(userId: string, input: Input): Output | Promise<Output>;
}
