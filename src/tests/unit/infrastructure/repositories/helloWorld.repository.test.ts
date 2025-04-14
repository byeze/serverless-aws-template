import { HelloWorld } from "@/domain/entities/helloWorld.entity";
import { HelloWorldRepositoryImpl } from "@/infrastructure/repositories/helloWorld.repository";

describe("HelloWorldRepository", () => {
  let repository: HelloWorldRepositoryImpl;

  beforeEach(() => {
    repository = new HelloWorldRepositoryImpl();
  });

  it("should return a HelloWorld entity with the correct message", async () => {
    const helloWorld = await repository.getHelloWorldMessage();

    expect(helloWorld).toBeInstanceOf(HelloWorld);
    expect(helloWorld.message).toBe("Hello, World!");
  });
});
