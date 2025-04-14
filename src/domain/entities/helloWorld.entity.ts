/**
 * Class representing a HelloWorld entity.
 */
export class HelloWorld {
  /**
   * The message property of the HelloWorld entity.
   */
  public readonly message: string;

  /**
   * Constructor for the HelloWorld entity.
   * @param {string} message - The hello world message.
   */
  constructor(message: string) {
    this.message = message;
  }

  /**
   * Method to get the hello world message.
   * @returns {string} The hello world message.
   */
  getMessage(): string {
    return this.message;
  }
}
