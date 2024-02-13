export interface IMessage {
  prompt: string;
  message: string;
  timestamp: Date;
  generateMessage(prompt: string): Promise<string>;
}
