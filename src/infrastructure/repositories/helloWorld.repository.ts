import { HelloWorld } from "@/domain/entities/helloWorld.entity";
import { HelloWorldRepository } from "@/domain/interfaces/HelloWorld.repository";

/**
 * Implementation of HelloWorldRepository.
 */
export class HelloWorldRepositoryImpl implements HelloWorldRepository {
  /**
   * @inheritdoc
   */
  async getHelloWorldMessage(): Promise<HelloWorld> {
    return new HelloWorld("Hello, World!");
  }
}
