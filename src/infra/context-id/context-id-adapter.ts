import { ContextId } from '@/data/protocols/context-id';
import { v4 as uuidv4 } from 'uuid';

export class ContextIdAdapter implements ContextId {
  async generate(value: string): Promise<string> {
    if (!value) return uuidv4();
    return value;
  }
}
