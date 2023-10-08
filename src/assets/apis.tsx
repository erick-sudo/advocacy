export const baseUrl = "http://localhost:3000";
// const baseUrl = "http://localhost:8080";

export const endpoints = {
  getAccessToken: `${baseUrl}/api/v1/auth/access-token`,
  getLoggedInUserProfile: `${baseUrl}/api/v1/current/user`,
};