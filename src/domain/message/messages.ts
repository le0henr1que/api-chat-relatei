import { IMessage } from './IMessage';

export class Message implements IMessage {
  constructor(
    public prompt: string,
    public message: string,
    public timestamp: Date,
  ) {
    this.prompt = prompt;
    this.message = message;
    this.timestamp = timestamp;
  }

  public async generateMessage(prompt: string): Promise<string> {
    return `The prompt is: ${prompt}`;
  }
}
