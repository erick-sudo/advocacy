import { apiCalls } from "../../assets/apiCalls";

export function usePagination() {
  const handlePagination = ({
    paginationEndpoint,
    populationEndpoint,
    pageNumber = 1,
    pagePopulation = 10,
    successCallback = () => {},
    errorCallback = () => {},
  }) => {
    apiCalls.getRequest({
      endpoint: populationEndpoint,
      httpMethod: "GET",
      httpHeaders: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        Accept: "application/json",
      },
      successCallback: (populationResponse) => {
        const population = parseInt(populationResponse?.size);
        if (
          population &&
          pageNumber <= Math.ceil(population / pagePopulation)
        ) {
          apiCalls.getRequest({
            endpoint:
              paginationEndpoint + pageNumber + "/" + pagePopulation,
            httpMethod: "GET",
            httpHeaders: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
              Accept: "application/json",
            },
            successCallback: successCallback,
          });
        }
      },
      errorCallback,
    });
  };

  return [handlePagination];
}
