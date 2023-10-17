import { useEffect, useState } from "react";
import { endpoints } from "../../assets/apis";
import Case, { CaseDetails } from "./Case";
import { Pagination } from "../common/Pagination";
import { Form } from "react-bootstrap";
import { apiCalls } from "../../assets/apiCalls";
import { notifiers } from "../../assets/notifiers";
import { FormModal } from "../common/FormModal";
import { Background } from "../common/DottedBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { NoResults } from "../common/NoResults";

export default function Cases({ setLoading }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [clients, setClients] = useState([]);
  // const [users, setUsers] = useState([])

  const paginationConfig = {
    paginationEndpoint: endpoints.pagination.getCases,
    populationEndpoint: endpoints.statistics.casesCount,
    itemsPerPage: 10,
    componentName: Case,
    dataKey: "casex",
    searchSupport: {
      support: true,
      searchPopulationEndpoint: endpoints.statistics.searchCasesCount,
      searchPaginationEndpoint: endpoints.pagination.search.searchCases,
      searchFields: [
        "id",
        "title",
        "case_no_or_parties",
        "file_reference",
        "clients_reference",
        "record",
      ],
    },
  };

  useEffect(() => {
    apiCalls.getRequest({
      endpoint: endpoints.clients.getAllClients,
      httpHeaders: {
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      successCallback: setClients,
    });
  }, []);

  const handleNewCaseSubmision = (payload) => {
    setLoading(true);
    apiCalls.postRequest({
      endpoint: endpoints.cases.postCase,
      httpHeaders: {
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      httpBody: payload,
      successCallback: (res) => {
        setLoading(false);
        notifiers.httpSuccess("Case created successfully");
      },
      errorCallback: (err) => {
        notifiers.httpError(err.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="relative">
      <div className="flex p-1 m-2">
        <FormModal
          onSubmit={handleNewCaseSubmision}
          inputFields={[
            {
              name: "title",
              as: "text",
              required: true,
            },
            {
              name: "description",
              as: "textarea",
              required: true,
            },
            {
              name: "case_no_or_parties",
              as: "text",
              required: true,
            },
            {
              name: "record",
              as: "text",
              required: true,
            },
            {
              name: "file_reference",
              as: "text",
              required: true,
            },
            {
              name: "clients_reference",
              as: "text",
              required: true,
            },
            {
              name: "client_id",
              as: "select",
              required: true,
              label: "Select Client",
              options: clients.map((cl) => ({ value: cl.id, label: cl.name })),
            },
          ]}
          anchorText="New Case"
          submitText="Save Case"
          description="Create New Case"
        />
      </div>
      <div className="shadow-sm bg-gray-100 mx-2">
        <Pagination
          direction="vertical"
          selfVScroll={{
            vScroll: true,
            vClasses: "p-2 max-h-[40vh]",
          }}
          recordsHeader={
            <div className="flex items-center gap-2 text-xs font-bold p-2">
              <span className="w-8"></span>
              <div className="grid grid-cols-2 items-center flex-grow">
                <div className="">Case</div>
                <div className="flex flex-wrap gap-x-4">
                  <h5>Case No/Parties (CN)</h5>
                  <h5>File Reference (FR)</h5>
                  <h5>Clients Reference (CR)</h5>
                </div>
              </div>
              <div className="min-w-[7rem] max-w-[7rem]">Record</div>
            </div>
          }
          paginationConfig={{ ...paginationConfig }}
          generalProps={{ setSelectedCase, selectedCase }}
        />
      </div>

      {selectedCase ? (
        <CaseDetails casex={selectedCase} setLoading={setLoading} />
      ) : (
        <NoResults className=""
          content={
            <div className="z-20">
              <div className="text-center text-5xl text-amber-900">
                <FontAwesomeIcon icon={faHandPointer} />
              </div>
              <div className="font-bold text-3xl text-amber-900">
                Please Click a Case above to view details
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
