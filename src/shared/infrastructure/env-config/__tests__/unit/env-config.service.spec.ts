import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../../env-config.service';
import { EnvConfigModule } from '../../env-config.module';

describe('EnvConfigService unit tests', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should return PORT variable', () => {
    expect(sut.getAppPort()).toBe(3000);
  });

  it('should return NODE_ENV variable', () => {
    expect(sut.getNodeEnv()).toBe('test');
  });

  it('should return JWT_SECRET variable', () => {
    expect(sut.getJwtSecret()).toBe('test_secret');
  });

  it('should return JWT_EXPIRES_IN variable', () => {
    expect(sut.getJwtExpirationTime()).toBe(86400);
  });
});
