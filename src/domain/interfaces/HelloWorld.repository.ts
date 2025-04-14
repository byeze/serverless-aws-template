import { HelloWorld } from "../entities/helloWorld.entity";

/**
 * Interface for HelloWorldRepository.
 */
export interface HelloWorldRepository {
  /**
   * Method to get a hello world message.
   * @returns {Promise<HelloWorld>} A promise that resolves to a HelloWorld entity.
   */
  getHelloWorldMessage(): Promise<HelloWorld>;
}
