export class BaseAuthDto {
  readonly email: string;
  readonly password: string;
}

export class RegisterDto extends BaseAuthDto {
  readonly fullname: string;
}

export class LoginDto extends BaseAuthDto {}
