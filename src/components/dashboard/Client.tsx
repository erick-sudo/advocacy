import { useEffect, useState } from "react";
import { Background } from "../common/DottedBackground";
import { PairView } from "./PairView";
import { apiCalls } from "../../assets/apiCalls";
import { endpoints } from "../../assets/apis";
import { caseStates } from "../../assets/data";
import { StrokeText } from "../common/StrokeText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SpeedCounter } from "../common/SpeedCounter";
import { DataChart } from "../common/DataChart";

export function Client({ client, selectedClient, setSelectedClient }) {
  return (
    <div
      onClick={() => setSelectedClient(client)}
      className={`relative flex odd:bg-white hover:bg-amber-800 hover:font-bold hover:text-white duration-500 cursor-pointer items-center border-b border-amber-800/25`}
    >
      {selectedClient?.id === client.id && (
        <div className="absolute flex inset-0">
          <div className="relative flex-grow">
            <Background />
          </div>
        </div>
      )}
      <div className="flex flex-grow p-2 gap-4">
        <div className="w-6 z-20 font-bold">{client.id}</div>
        <div className="flex flex-grow">
          <div className="w-1/4 truncate z-20">{client.name}</div>
          <div className="w-1/4 truncate z-20">{client.email}</div>
          <div className="w-1/4 truncate z-20">{client.address}</div>
          <div className="w-1/4 truncate z-20">{client.contact_number}</div>
        </div>
      </div>
    </div>
  );
}

export function ClientDetails({ client = {} }) {
  const [currentClient, setCurrentClient] = useState({});
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    setCurrentClient(client);
    [[endpoints.statistics.showClientStatistics, setStatistics]].forEach(
      (prop) => {
        apiCalls.getRequest({
          endpoint: prop[0].replace("<:clientId>", client.id),
          httpHeaders: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            Accept: "application/json",
          },
          successCallback: (res) => {
            // prop[1]
            setStatistics(
              caseStates.map((s) => ({
                ...s,
                count: Math.floor((Math.random() * 1000) % 200),
              }))
            );
          },
        });
      }
    );
  }, [client]);

  const sortedStatistics = statistics.slice();
  sortedStatistics.sort((a, b) => b.count - a.count);

  return (
    <div className="p-2">
      <div className="max-w-lg shadow-sm rounded overflow-hidden">
        <PairView
          title="Client Details"
          hClassName="text-center font-bold border-b py-2 bg-gray-200"
          wClassName=""
          fields={[
            "name",
            "username",
            "email",
            "contact_number",
            "address",
          ].map((f) => ({ name: f, dir: "h" }))}
          obj={currentClient}
        />
      </div>

      {/* States */}
      <div className="bg-white p-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
        {statistics.map((s, i) => (
          <div
            key={i}
            className="border-amber-800/75  rounded-lg bg-gradient-to-r from-gray-100 via-gray-100 to-white shadow-xl shadow-white overflow-hidden"
          >
            <div className="flex gap-2">
              <div className="text-3xl w-24 rounded-br-lg bg-gradient-to-r from-white text-gray-700/50 h-24 flex justify-center items-center shadow-md">
                <FontAwesomeIcon icon={s.icon} />
              </div>
              <div className="text-5xl flex-grow flex items-center font-extrabold">
                <StrokeText
                  fillColor="transparent"
                  strokeColor="black"
                  sz={1}
                  text={<SpeedCounter value={s.count} />}
                />
              </div>
            </div>
            <div className="text-3xl py-2 font-extrabold italic px-4">
              <StrokeText
                fillColor="white"
                strokeColor="rgb(146 64 14)"
                sz={1}
                text={s.name}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-xl">
        {statistics.length > 0 && (
          <DataChart
            plot_data={{
              title: "Sanlam's Case State Analysis",
              dimensionRatio: 0.7,
              graph_type: "line",
              options: {
                indexAxis: "y",
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Number of Conferences",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Case Status",
                    },
                  },
                },
              },
              data: {
                labels: sortedStatistics.map((s) => s.name),
                datasets: [
                  {
                    label: "Number of Cases",
                    data: sortedStatistics.map((s) => s.count),
                    borderColor: "rgb(146 64 14)",
                    backgroundColor: "rgba(107, 114, 128, .7)",
                    fill: true,
                  },
                ],
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
