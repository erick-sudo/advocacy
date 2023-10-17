import { useEffect, useState } from "react";
import { endpoints } from "../../assets/apis";
import { apiCalls } from "../../assets/apiCalls";
import { DataChart } from "../common/DataChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { ModalLink } from "../common/ModalLink";

export function Dash() {
  const [casesPerClient, setCasesPerClient] = useState([]);

  useEffect(() => {
    [[endpoints.dash.getCasesPerClient, setCasesPerClient]].forEach((prop) => {
      apiCalls.getRequest({
        endpoint: prop[0],
        httpHeaders: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json",
        },
        successCallback: prop[1],
      });
    });
  }, []);

  const sortedCasesPerClient = casesPerClient.slice();
  sortedCasesPerClient.sort((a, b) => a.cases - b.cases);

  return (
    <div>
      <div className=" grid lg:grid-cols-2 p-2">
        <div className="p-2 bg-gray-100 max-w-xl rounded">
          <DataChart
            plot_data={{
              title: (
                <div className="flex items-center justify-between">
                  <div>Number of Cases</div>
                  <ModalLink
                    submitText="PRINT"
                    description="Print"
                    anchorText=""
                    anchorClassName="text-amber-800 p-2 rounded hover:bg-white hover:-translate-y-2 duration-300"
                    icon={<FontAwesomeIcon icon={faPrint} />}
                  />
                </div>
              ),
              dimensionRatio: 0.6,
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
                      text: "Number of Cases",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Clients",
                    },
                  },
                },
              },
              data: {
                labels: sortedCasesPerClient.map((s) => s.name),
                datasets: [
                  {
                    label: "Number of Cases",
                    data: sortedCasesPerClient.map((s) => s.cases),
                    borderColor: "rgb(146 64 14)",
                    backgroundColor: "rgba(107, 114, 128, .7)",
                    fill: true,
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
