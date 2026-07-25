export const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  email_already_registered: "An account with this email already exists.",
  weak_password: "Password must be at least 8 characters.",
  rate_limited: "Too many attempts. Try again in a minute.",
  session_expired: "Your session expired. Please log in again.",
  invalid_or_expired_token: "The reset link is invalid or has expired.",
  network_error: "Couldn't reach the server. Please try again.",
  invalid_request: "Please check your information and try again.",
  invalid_google_token: "Google sign-in failed. Please try again.",
  email_exists_use_password: "An account with this email already exists. Please log in with your password.",
  google_signin_not_configured: "Google sign-in is not configured. Please use email and password.",
};

export function getErrorMessage(code: string): string {
  if (!code) return "Something went wrong. Please try again. (Code missing)";
  return ERROR_MESSAGES[code] ?? `Something went wrong. Please try again. (Raw code: ${code})`;
}