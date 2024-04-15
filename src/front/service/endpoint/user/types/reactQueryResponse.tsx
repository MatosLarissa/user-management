import { ApiResponse } from "./apiResponse.type"

export interface ReactQueryResponse {
  isPending: boolean;
  error: any;
  data?: ApiResponse;
}