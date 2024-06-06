import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import nodemailer from 'nodemailer';
import { EnvConfigService } from '@/shared/infrastructure/env-config/env-config.service';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordWithTokenDto } from '@/users/infrastructure/dtos/updatepasswordwithtoken.dto';

export namespace UpdatePasswordUseCase {
  export type Input = {
    email: string;
    password: string;
    oldPassword?: string;
    token?: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findByEmail(input.email);

      if (!input.password) {
        throw new InvalidPasswordError('New password is required');
      }

      if (input.oldPassword) {
        const oldPasswordIsValid = await this.hashProvider.compareHash(
          input.oldPassword,
          entity.password,
        );

        if (!oldPasswordIsValid) {
          throw new InvalidPasswordError('Old password is invalid');
        }
      } else if (input.token) {
        if (
          input.token !== entity.resetPasswordToken ||
          new Date() > entity.resetPasswordExpires
        ) {
          throw new InvalidPasswordError('Token is invalid or expired');
        }

        await this.userRepository.clearResetPasswordToken(entity.id);
      } else {
        throw new InvalidPasswordError('Old password or token is required');
      }

      const hashedPassword = await this.hashProvider.generateHash(
        input.password,
      );
      entity.updatePassword(hashedPassword);
      await this.userRepository.update(entity);

      return UserOutputMapper.toOutput(entity);
    }

    async sendEmailToUpdatePassword(
      updatePasswordWithTokenDto: UpdatePasswordWithTokenDto,
    ): Promise<void> {
      const envConfigService = new EnvConfigService(new ConfigService());
      const token = this.hashProvider.generateResetToken();
      const { email } = updatePasswordWithTokenDto;
      const entity = await this.userRepository.findByEmail(email);

      await this.userRepository.setResetPasswordToken(entity.id, token);

      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: envConfigService.getEmailUser(),
            pass: envConfigService.getEmailPassword(),
          },
        });

        const mailOptions = {
          from: envConfigService.getEmailUser(),
          to: email,
          subject: 'Redefinição de Senha',
          text: `Você solicitou a redefinição de senha para sua conta.
          O seu token de redefinição é: ${token}`,
        };

        await transporter.sendMail(mailOptions);
      } catch {
        throw new InternalServerErrorException(
          'Erro ao gerar token de redefinição de senha',
        );
      }
    }
  }
}
