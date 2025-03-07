import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.payload?.error ??
      "An error occurred. Please try again."
    );
  }
  return "An unexpected error occurred.";
}
