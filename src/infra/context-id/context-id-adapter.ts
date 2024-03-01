import { ContextId } from '@/data/protocols/context-id';
import { uuid } from 'uuidv4';

export class ContextIdAdapter implements ContextId {
  async generate(value: string): Promise<string> {
    if (!value) return await uuid();
    return value;
  }
}
