import { HashProvider } from '@/shared/application/providers/hash-provider';
import { compare, hash } from 'bcryptjs';
import { randomBytes } from 'node:crypto';

export class BcryptjsHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 6);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  generateResetToken() {
    return randomBytes(3).toString('hex');
  }
}
