export interface SuccessResponse<Data> {
  status: "success";
  message: string;
  data: Data;
}

export interface ErrorResponse {
  status: "error";
  message: string;
  errorDetails?: any;
}