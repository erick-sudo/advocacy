import { useEffect, useState } from "react";
import { ModalLink } from "./ModalLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { apiCalls } from "../../assets/apiCalls";
import { notifiers } from "../../assets/notifiers";
import { utilityFunctions } from "../../assets/functions";
import { InputGroup, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { OptionSelection } from "./OptionSelection";

// "Content-Type": "application/json",

export default function EditModal({
  dataEndpoint = "",
  icon = <FontAwesomeIcon icon={faFileEdit} />,
  anchorText = "Edit",
  anchorClassName = "flex gap-2 items-center box_shadow rounded px-4 py-2 bg-gray-100 text-amber-800 hover:text-black hover:bg-amber-700 hover:-translate-y-2 duration-200",
  description = "Edit",
  updateEndpoint = "",
  receiveNewRecord = () => {},
  editableFields = [],
  displayFields = [],
}) {
  const [endpoint, setEndpoint] = useState(null);
  const [formData, setFormData] = useState({});
  const [changes, setChanges] = useState({});

  useEffect(() => {
    if (endpoint) {
      apiCalls.getRequest({
        endpoint: endpoint,
        httpHeaders: {
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        successCallback: setFormData,
        errorCallback: (err) => {
          notifiers.httpError(err);
        },
      });
    }
  }, [endpoint]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setChanges({
      ...changes,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    if (typeof changes == "object" && Object.keys(changes).length > 0) {
      apiCalls.postRequest({
        endpoint: updateEndpoint,
        httpMethod: "PATCH",
        httpHeaders: {
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        httpBody: changes,
        successCallback: (res) => {
          receiveNewRecord(res);
          notifiers.httpSuccess("Update Success");
        },
        errorCallback: (err) => {
          notifiers.httpError(err);
        },
      });
    } else {
      notifiers.generalInfo("No changes detected");
    }
    setEndpoint(null);
  };

  return (
    <div className="">
      <ModalLink
        anchorClassName={anchorClassName}
        anchorText={anchorText}
        submitText="Save Changes"
        onInit={() => {
          setEndpoint(dataEndpoint);
        }}
        hostResourceCleaner={() => {
          setFormData({});
          setChanges({});
          setEndpoint(null);
        }}
        submitData={handleUpdate}
        disabled={Boolean(
          editableFields.find((field) => !Boolean(formData[field.name]))
        )}
        description={description}
        icon={icon}
        modalContent={
          endpoint &&
          !Boolean(
            [...displayFields, ...editableFields.map((f) => f.name)].find(
              (field) => formData[field] === undefined
            )
          ) && (
            <div className="grid gap-4">
              <div className="grid gap-2 shadow-sm p-2 rounded bg-gray-100">
                {displayFields.map((field, index) => (
                  <div className="" key={index}>
                    <div className=" text-amber-800 font-bold px-4 text-lg">
                      {utilityFunctions.snakeCaseToTitleCase(field)}
                    </div>
                    <div className=" px-8">{formData[field]}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-4">
                {editableFields.map((field, index) =>
                  field.as === "select" ? (
                    <OptionSelection
                      key={index}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      label={field.label}
                      name={field.name}
                      options={field.options}
                    />
                  ) : field.as === "textarea" ? (
                    <ListGroup key={index}>
                      <ListGroupItem>
                        <span className="text-gray-900/50 font-bold px-4">
                          {utilityFunctions.snakeCaseToTitleCase(field.name)}
                        </span>
                      </ListGroupItem>
                      <ListGroupItem
                        style={{ overflow: "hidden" }}
                        className="p-0"
                      >
                        <Form.Control
                          style={{ borderRadius: 0, border: "none" }}
                          as="textarea"
                          rows={4}
                          name={field.name}
                          onChange={handleChange}
                          value={formData[field.name] || ""}
                          required
                        />
                      </ListGroupItem>
                    </ListGroup>
                  ) : (
                    <InputGroup className="" key={index}>
                      <InputGroup.Text
                        style={{
                          maxWidth: "40%",
                          minWidth: "40%",
                          direction: "rtl",
                        }}
                      >
                        <span className="text-gray-900/50 font-bold">
                          {utilityFunctions.snakeCaseToTitleCase(field.name)}
                        </span>
                      </InputGroup.Text>

                      <Form.Control
                        type={field.as}
                        style={{ maxWidth: "60%", minWidth: "60%" }}
                        name={field.name}
                        onChange={handleChange}
                        value={formData[field.name] || ""}
                        required
                      />
                    </InputGroup>
                  )
                )}
              </div>
            </div>
          )
        }
      />
    </div>
  );
}
