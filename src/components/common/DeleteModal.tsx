import { ModalLink } from "./ModalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faWarning } from "@fortawesome/free-solid-svg-icons";
import { apiCalls } from "../../assets/apiCalls";
import { notifiers } from "../../assets/notifiers";
import { faExclamation } from "@fortawesome/free-solid-svg-icons/faExclamation";

export function DeleteModal({
  description = "Delete",
  anchorText="Delete",
  anchorClassName = "flex gap-2 items-center box_shadow rounded px-4 py-2 bg-gray-100 text-amber-800 hover:text-black hover:bg-amber-700 hover:-translate-y-2 duration-200",
  endpoint = "",
  receiveResponse = () => {},
  icon = <FontAwesomeIcon icon={faTrashCan} />,
}) {
  const handleSubmit = () => {
    if (endpoint) {
      apiCalls.deleteRequest({
        endpoint: endpoint,
        httpHeaders: {
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        successCallback: (res) => {
          receiveResponse(res);
          notifiers.httpSuccess("Record Deleted");
        },
        errorCallback: (err) => {
          notifiers.httpError(err);
        },
      });
    }
  };

  return (
    <div>
      <ModalLink
        anchorClassName={anchorClassName}
        submitButtonClassName="bg-red-800 text-white hover:bg-red-600"
        cancelButtonClassName="bg-amber-600 text-white"
        cancelText="No"
        anchorText={anchorText}
        icon={icon}
        submitText="Yes"
        description={description}
        submitData={handleSubmit}
        modalContent={
          <div>
            <div className="flex gap-2 items-center font-bold text-red-600">
              <span className="text-[4em]">
                <FontAwesomeIcon icon={faWarning} />
              </span>
              <div className="flex items-center gap-2">
                <span>This Action is Irreversible</span>
                <div className="flex gap-1 text-2xl">
                  <FontAwesomeIcon icon={faExclamation} />
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
              </div>
            </div>
            <div className="text-center text-2xl">
              Are you sure you want to delete
            </div>
          </div>
        }
      />
    </div>
  );
}
