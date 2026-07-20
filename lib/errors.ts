export const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_already_registered: "An account with this email already exists.",
  weak_password: "Password must be at least 8 characters.",
  rate_limited: "Too many attempts. Try again in a minute.",
  session_expired: "Your session expired. Please log in again.",
  network_error: "Couldn't reach the server. Please try again.",
};

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? "Something went wrong. Please try again.";
}