import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.payload?.error.message ??
      "An error occurred. Please try again."
    );
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return (error as ErrorAPI).message;
  }
  return "An unexpected error occurred.";
}

export function getErrorStatusCode(error: unknown): number {
  if (error instanceof AxiosError) {
    return error.response?.status ?? 500;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return (error as ErrorAPI).status;
  }
  return 500;
}
