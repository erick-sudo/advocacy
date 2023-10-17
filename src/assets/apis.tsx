export const baseUrl = "http://localhost:3000/api/v1";
// const baseUrl = "http://localhost:8080";

export const endpoints = {
  getAccessToken: `${baseUrl}/auth/access-token`,
  getLoggedInUserProfile: `${baseUrl}/current/user`,
  statistics: {
    casesCount: `${baseUrl}/stats/cases/count`,
    clientsCount: `${baseUrl}/stats/clients/count`,
    searchCasesCount: `${baseUrl}/stats/search/cases/count/<:q>/<:v>/`,
    searchClientsCount: `${baseUrl}/stats/search/clients/count/<:q>/<:v>/`,
    showClientStatistics: `${baseUrl}/clients/<:clientId>/show/statistics`
  },
  pagination: {
    getCases: `${baseUrl}/pages/cases/`,
    getClients: `${baseUrl}/pages/clients/`,
    search: {
      searchCases: `${baseUrl}/search/cases/<:q>/<:v>/`,
      searchClients: `${baseUrl}/search/clients/<:q>/<:v>/`,
    },
  },
  users: {
    getBriefUsers: `${baseUrl}/users/brief`,
  },
  clients: {
    getAllClients: `${baseUrl}/clients/all`,
    postClient: `${baseUrl}/clients/new`
  },
  parties: {
    crud: `${baseUrl}/parties/<:id>`,
  },
  payments: {
    crud: `${baseUrl}/payments/<:id>`,
  },
  cases: {
    getCase: `${baseUrl}/cases/<:caseId>`,
    getPaymentInformation: `${baseUrl}/cases/<:caseId>/payment_information`,
    getImportantDates: `${baseUrl}/cases/<:caseId>/important_dates`,
    getHearings: `${baseUrl}/cases/<:caseId>/hearings`,
    getTasks: `${baseUrl}/cases/<:caseId>/tasks`,
    getParties: `${baseUrl}/cases/<:caseId>/parties`,
    postCase: `${baseUrl}/cases/new`,
    patchCase: `${baseUrl}/cases/<:caseId>/update`,
    initializePaymentInformation: `${baseUrl}/cases/<:caseId>/initialize_payment_information`,
    addInstallment: `${baseUrl}/cases/<:caseId>/add_installment`,
    addParty: `${baseUrl}/cases/<:caseId>/add_party`,
  },
  dash: {
    getCasesPerClient: `${baseUrl}/dashboard/cases/per/client`
  }
};
