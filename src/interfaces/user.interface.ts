import { SuccessResponse } from "./response.interface";

export interface NewUserRequest {
    name: string;
}

export interface NewUserResponse
  extends SuccessResponse<{}> {}