export interface SignInRequestDto {
  email: string;
  pass: string;
}

export interface SignInResponseDto {
  access_token: string;
}
