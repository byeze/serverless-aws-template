import { HelloWorld } from "@/domain/entities/helloWorld.entity";

describe("HelloWorld Entity", () => {
  it("should create an instance with the given message", () => {
    const message = "Hello, World!";
    const helloWorld = new HelloWorld(message);

    expect(helloWorld).toBeInstanceOf(HelloWorld);
    expect(helloWorld.message).toBe(message);
  });

  it("should return the correct message using getMessage method", () => {
    const message = "Hello, World!";
    const helloWorld = new HelloWorld(message);

    expect(helloWorld.getMessage()).toBe(message);
  });
});
