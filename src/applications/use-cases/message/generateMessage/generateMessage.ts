import { IMessage } from '@/domain/entity/message/IMessage';

export class GenerateMessage {
  constructor(private readonly message: IMessage) {
    this.message = message;
  }

  public async execute(prompt: string): Promise<string> {
    return this.message.generateMessage(prompt);
  }
}
