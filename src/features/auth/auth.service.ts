import { Injectable } from '@nestjs/common';
import { RegisterDto } from './auth.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  login() {
    return this.accountsService.login();
  }

  register(registerData: RegisterDto) {
    return this.accountsService.createAccount(registerData);
  }
}
