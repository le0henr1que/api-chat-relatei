import { ContextIdAdapter } from '@/infra/context-id/context-id-adapter';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

(uuidv4 as jest.Mock).mockReturnValue('your-mock-value');

describe('ContextIdAdapter', () => {
  let contextIdAdapter: ContextIdAdapter;

  beforeEach(() => {
    contextIdAdapter = new ContextIdAdapter();
  });

  it('should return the same value if value is provided', async () => {
    const value = 'test_value';
    const result = await contextIdAdapter.generate(value);
    expect(result).toBe(value);
  });

  it('should generate a new uuid if no value is provided', async () => {
    const uuid = 'generated_uuid';
    (uuidv4 as jest.Mock).mockReturnValue(uuid);
    const result = await contextIdAdapter.generate('');
    expect(result).toBe(uuid);
  });
});
