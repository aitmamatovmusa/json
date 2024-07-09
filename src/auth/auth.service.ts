import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AccountsService } from 'src/features/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  register(registerData: RegisterDto) {
    return this.accountsService.createAccount(registerData);
  }
}
