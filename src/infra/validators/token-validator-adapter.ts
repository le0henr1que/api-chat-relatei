import { TokenValidator } from '@/presentation/protocols';

export class TokenValidators implements TokenValidator {
  isValid(token: string): boolean {
    return true;
  }
}
