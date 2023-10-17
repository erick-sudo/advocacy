import { Form } from "react-bootstrap";
import { endpoints } from "../../assets/apis";
import { Client, ClientDetails } from "./Client";
import { Pagination } from "../common/Pagination";
import { useState } from "react";
import { FormModal } from "../common/FormModal";
import { apiCalls } from "../../assets/apiCalls";
import { notifiers } from "../../assets/notifiers";
import { PairView } from "./PairView";
import { StrokeText } from "../common/StrokeText";
import { NoResults } from "../common/NoResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

export default function Clients({ setLoading }) {
  const [selectedClient, setSelectedClient] = useState(null);
  const [brandNewClient, setBrandNewClient] = useState(null);

  const paginationConfig = {
    paginationEndpoint: endpoints.pagination.getClients,
    populationEndpoint: endpoints.statistics.clientsCount,
    itemsPerPage: 10,
    componentName: Client,
    dataKey: "client",
    searchSupport: {
      support: true,
      searchPopulationEndpoint: endpoints.statistics.searchClientsCount,
      searchPaginationEndpoint: endpoints.pagination.search.searchClients,
      searchFields: [
        "id",
        "name",
        "username",
        "email",
        "contact_number",
        "address",
      ],
    },
  };

  return (
    <div>
      <div className="flex justify-end p-1">
        <div className="mx-4">
          <Form.Select name="action" className="text-sm p-1">
            <option value="delete">Actions</option>
            <option value="delete_client">Delete Client</option>
            <option value="delete_clients">Delete Clients</option>
          </Form.Select>
        </div>
      </div>
      <div className="bg-gray-100 mx-2">
        <div className="flex gap-2 font-bold px-4 py-2">
          <span className="w-6"></span>
          <div className="flex flex-grow">
            <span className="w-1/4">Name</span>
            <span className="w-1/4">Email</span>
            <span className="w-1/4">Address</span>
            <span className="w-1/4">Contact Number</span>
          </div>
        </div>
        <Pagination
          direction="vertical"
          selfVScroll={{
            vScroll: true,
            vClasses: "p-2 max-h-[40vh]",
          }}
          paginationConfig={{ ...paginationConfig }}
          generalProps={{ setSelectedClient, selectedClient }}
        />
      </div>

      <div className="p-4">
        <FormModal
          onSubmit={(payload) => {
            setLoading(true);
            apiCalls.postRequest({
              endpoint: endpoints.clients.postClient,
              httpHeaders: {
                Accept: "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
                "Content-Type": "application/json",
              },
              httpBody: payload,
              successCallback: (res) => {
                setBrandNewClient(res);
                notifiers.httpSuccess("New Client Created");
                setLoading(false);
              },
              errorCallback: (err) => {
                notifiers.httpError(res);
                setLoading(false);
              },
            });
          }}
          inputFields={[
            { as: "text", required: true, name: "name" },
            { as: "text", required: true, name: "username" },
            { as: "email", required: true, name: "email" },
            { as: "text", required: true, name: "contact_number" },
            { as: "text", required: true, name: "address" },
            { as: "password", required: true, name: "password" },
            { as: "password", required: true, name: "password_confirmation" },
          ]}
          description="New Client"
          anchorText="Register New Client"
        />
      </div>

      {brandNewClient && (
        <div>
          <PairView
            title={
              <div className="relative">
                <span>New Client</span>
                <span className="text-[4em] rounded p-1 absolute top-[100%] right-0">
                  <StrokeText
                    fillColor="rgb(146 64 14)"
                    strokeColor="black"
                    sz={4}
                    text="NEW"
                  />
                </span>
              </div>
            }
            hClassName="font-bold border-b px-12 py-2 bg-gray-200"
            wClassName=""
            fields={[
              "name",
              "username",
              "email",
              "contact_number",
              "address",
            ].map((f) => ({ name: f, dir: "h" }))}
            obj={brandNewClient}
          />
        </div>
      )}

      {selectedClient ? (
        <ClientDetails client={selectedClient} />
      ) : (
        <NoResults
          className=""
          content={
            <div className="z-20">
              <div className="text-center text-5xl text-amber-900">
                <FontAwesomeIcon icon={faHandPointer} />
              </div>
              <div className="font-bold text-3xl text-amber-900">
                Please Click a Client above to view details
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
