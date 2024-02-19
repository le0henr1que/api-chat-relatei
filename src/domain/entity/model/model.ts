import { IModel } from './IModel';

class Model implements IModel {
  public name: string;
  public maxTokens: number;

  constructor(name: string, maxTokens: number) {
    this.name = name;
    this.maxTokens = maxTokens;
  }

  public getName(): string {
    return this.name;
  }

  public getMaxTokens(): number {
    return this.maxTokens;
  }
}

export { Model };
