import { useState, useEffect } from "react";
import { Background } from "../common/DottedBackground";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { utilityFunctions } from "../../assets/functions";
import { apiCalls } from "../../assets/apiCalls";
import { endpoints } from "../../assets/apis";

export default function Case({ casex, selectedCase, setSelectedCase }) {
  return (
    <div
      onClick={() => setSelectedCase(casex)}
      className={`relative flex odd:bg-white hover:bg-amber-800 hover:font-bold hover:text-white duration-500 cursor-pointer items-center border-b border-amber-800/25`}
    >
      {selectedCase?.id === casex.id && (
        <div className="absolute --10 flex inset-0">
          <div className="relative flex-grow">
            <Background />
          </div>
        </div>
      )}
      <div className="flex flex-grow p-2 gap-4">
        <div className=" z-20">
          <input type="checkbox" style={{ margin: 0 }} />
        </div>
        <div className="w-1/4 z-20">{casex.case_number}</div>
        <div className="w-1/2 z-20">{casex.title}</div>
        <div className="w-1/4 z-20">{casex.status}</div>
      </div>
    </div>
  );
}

export function CaseDetails({ casex = {} }) {
  const [otherAssignedUsers, setOtherAssignedUsers] = useState([]);
  const [primeRespondent, setPrimeRespondents] = useState(null);
  const [otherRespondents, setOtherRespondents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [importantDates, setImportantDatess] = useState([]);
  const [paymentInformation, setPaymentInformation] = useState(null);

  useEffect(() => {
    apiCalls.getRequest({
      endpoint: endpoints.cases.getPaymentInformation.replace(
        "<:caseId>",
        casex.id
      ),
      httpHeaders: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        Accept: "application/json",
      },
      successCallback: setPaymentInformation,
    });
  }, []);

  // console.log(paymentInformation);

  return (
    <div className="p-4">
      {casex && (
        <div className="flex flex-col gap-8">
          <div>
            <h4 className="text-xl font-bold text-amber-800 border-b px-2 border-amber-700/50">
              {casex.title}
            </h4>
            <div className="p-4">{casex.description}</div>
            <div className="flex gap-4 px-4">
              <h3 className="flex gap-2 items-center">
                <span className="font-bold text-amber-700">ID</span>
                <span>{casex.id}</span>
              </h3>
              <h4 className="flex gap-2">
                <span className="font-bold text-amber-700">Number</span>
                <span>{casex.case_number}</span>
              </h4>
            </div>
          </div>

          {casex.prime_user && (
            <ListGroup className="">
              <ListGroupItem variant="danger" className="p-0">
                <h4 className="text-lg p-2 font-thin text-amber-800 px-4">
                  Represented By
                </h4>
              </ListGroupItem>
              <ListGroupItem variant="danger" className="p-0">
                <ListGroup>
                  {Object.keys(casex.prime_user)
                    .filter((prop) => prop != "id")
                    .map((prop, idx) => (
                      <ListGroupItem variant="" key={idx}>
                        <div className="flex items-center py-2">
                          <span>
                            {utilityFunctions.snakeCaseToTitleCase(prop)}
                          </span>
                          <span className="flex-grow border-b border-dashed border-amber-700/25 mx-3"></span>
                          <span className="w-1/2">
                            {casex.prime_user[prop]}
                          </span>
                        </div>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          )}

          <div className="p-2 shadow-sm">
            <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
              Other assigned personel
            </h4>
            <div>
              {otherAssignedUsers.map((dt, index) => (
                <div key={index}></div>
              ))}
            </div>
          </div>

          {casex.prime_client && (
            <ListGroup className="">
              <ListGroupItem variant="danger">
                <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
                  Prime Client
                </h4>
              </ListGroupItem>
              <ListGroupItem variant="danger" className="p-0">
                <ListGroup>
                  {Object.keys(casex.prime_client)
                    .filter((prop) => prop != "id")
                    .map((prop, idx) => (
                      <ListGroupItem key={idx}>
                        <div className="flex items-center py-2">
                          <span>
                            {utilityFunctions.snakeCaseToTitleCase(prop)}
                          </span>
                          <span className="flex-grow border-b border-dashed border-amber-700/25 mx-3"></span>
                          <span className="w-1/2">
                            {casex.prime_client[prop]}
                          </span>
                        </div>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          )}

          {casex.prime_respondent && (
            <ListGroup className="">
              <ListGroupItem variant="danger">
                <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
                  Prime Respondent
                </h4>
              </ListGroupItem>
              <ListGroupItem variant="danger" className="p-0">
                <ListGroup>
                  {Object.keys(casex.prime_respondent)
                    .filter((prop) => prop != "id")
                    .map((prop, idx) => (
                      <ListGroupItem key={idx}>
                        <div className="flex items-center py-2">
                          <span>
                            {utilityFunctions.snakeCaseToTitleCase(prop)}
                          </span>
                          <span className="flex-grow border-b border-dashed border-amber-700/25 mx-3"></span>
                          <span className="w-1/2">
                            {casex.prime_respondent[prop]}
                          </span>
                        </div>
                      </ListGroupItem>
                    ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          )}

          <div className="p-2 shadow-sm">
            <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
              Other respondents
            </h4>
            <div>
              {otherRespondents.map((dt, index) => (
                <div key={index}></div>
              ))}
            </div>
          </div>

          <div className="p-2 shadow-sm">
            <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
              Assigned tasks
            </h4>
            <div>
              {tasks.map((dt, index) => (
                <div key={index}></div>
              ))}
            </div>
          </div>

          <div className="p-2 shadow-sm">
            <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
              Important Dates
            </h4>
            <div>
              {importantDates.map((dt, index) => (
                <div key={index}></div>
              ))}
            </div>
          </div>

          <div className="p-2 shadow-sm">
            <h4 className="text-lg font-thin text-amber-800 px-4 border-b border-amber-700/10">
              Payment Information
            </h4>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
