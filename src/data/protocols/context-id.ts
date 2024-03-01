export interface ContextId {
  generate: (value: string) => Promise<string>;
}
