import { SuccessResponse } from "./response.interface";

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse
  extends SuccessResponse<{ token: string; expiresAt: Date }> {}
