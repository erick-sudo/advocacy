import { useState } from "react";
import { endpoints } from "../../assets/apis";
import Case, { CaseDetails } from "./Case";
import { Pagination } from "../common/Pagination";
import { Form } from "react-bootstrap";

export default function Cases() {
  const [selectedCase, setSelectedCase] = useState(null);

  const paginationConfig = {
    paginationEndpoint: endpoints.pagination.getCases,
    populationEndpoint: endpoints.statistics.casesCount,
    itemsPerPage: 10,
    componentName: Case,
    dataKey: "casex",
  };

  return (
    <div>
      <div className="flex justify-end p-1">
        <div className="mx-4">
          <Form.Select name="action" className="text-sm p-1">
            <option value="delete">Actions</option>
            <option value="delete_case">Delete Case</option>
            <option value="delete_cases">Delete Cases</option>
          </Form.Select>
        </div>
      </div>
      <div className="border-1 border-amber-800 bg-gray-100 mx-2">
        <div className="flex gap-2 font-bold py-2">
          <span className="w-6"></span>
          <span className="w-1/4">Case Number</span>
          <span className="w-1/2">Case</span>
          <span className="w-1/4">Status</span>
        </div>
        <Pagination
          direction="vertical"
          selfVScroll={{
            vScroll: true,
            vClasses: "p-2 max-h-[40vh]",
          }}
          paginationConfig={{ ...paginationConfig }}
          generalProps={{ setSelectedCase, selectedCase }}
        />
      </div>

      {selectedCase && <CaseDetails casex={selectedCase} /> }
    </div>
  );
}
