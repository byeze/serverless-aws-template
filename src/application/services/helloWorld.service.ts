import { HelloWorld } from "@/domain/entities/helloWorld.entity";
import { HelloWorldRepository } from "@/domain/interfaces/HelloWorld.repository";
import { HelloWorldRepositoryImpl } from "@/infrastructure/repositories/helloWorld.repository";

/**
 * Service for handling Hello World operations.
 */
export class HelloWorldService {
  private readonly helloWorldRepository: HelloWorldRepository;

  /**
   * Constructor for HelloWorldService.
   */
  constructor() {
    this.helloWorldRepository = new HelloWorldRepositoryImpl();
  }

  /**
   * Method to get a hello world message.
   * @returns {Promise<HelloWorld>} A promise that resolves to a HelloWorld entity.
   */
  async getHelloWorldMessage(): Promise<HelloWorld> {
    return this.helloWorldRepository.getHelloWorldMessage();
  }
}
