import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type GenerateJwtProps = {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private envConfigService: EnvConfigService,
  ) {}

  async generateJwtToken(userId: string): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {});
    return { accessToken };
  }

  async verifyJwtToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.envConfigService.getJwtSecret(),
    });
  }
}
