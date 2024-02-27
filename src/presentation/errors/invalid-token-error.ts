export class InvalidToken extends Error {
  constructor(paramName) {
    super(`Invalid token: ${paramName}`);
    this.name = 'InvalidToken';
  }
}
