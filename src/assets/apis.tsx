export const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "http://localhost:8080";

export const endpoints = {
  getAccessToken: `${baseUrl}/auth/access-token`,
  getLoggedInUserProfile: `${baseUrl}/current/user`,
  statistics: {
    casesCount: `${baseUrl}/stats/cases/count`,
  },
  pagination: {
    getCases: `${baseUrl}/pages/cases/`,
  },
  cases: {
    getOtherRespondents: `${baseUrl}/cases/<:caseId>/other_respondents`,
    getPaymentInformation: `${baseUrl}/cases/<:caseId>/payment_information`,
    getOtherAssignedUsers: `${baseUrl}/cases/<:caseId>/other_assigned_users`,
    getOtherClients: `${baseUrl}/cases/<:caseId>/other_clients`,
    getImportantDates: `${baseUrl}/cases/<:caseId>/important_dates`,
    getHearings: `${baseUrl}/cases/<:caseId>/hearings`,
    getTasks: `${baseUrl}/cases/<:caseId>/tasks`,
  },
};
