import {} from "react";
import { endpoints } from "../../assets/apis";
import Case from "./Case";
import { Pagination } from "../common/Pagination";

export default function Cases() {
  const paginationConfig = {
    paginationEndpoint: endpoints.pagination.getCases,
    populationEndpoint: endpoints.statistics.casesCount,
    itemsPerPage: 10,
    componentName: Case,
    dataKey: "casex"
  };

  return (
    <div>
      <Pagination
        direction="vertical"
        paginationConfig={{ ...paginationConfig }}
      />
    </div>
  );
}
