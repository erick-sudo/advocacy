export const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "http://localhost:8080";

export const endpoints = {
  getAccessToken: `${baseUrl}/auth/access-token`,
  getLoggedInUserProfile: `${baseUrl}/current/user`,
  statistics: {
    casesCount: `${baseUrl}/stats/cases/count`
  },
  pagination: {
    getCases: `${baseUrl}/pages/cases/` 
  }
};