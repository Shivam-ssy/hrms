import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import DashCard from "./DashCard.jsx"
function Dashboard() {
  return (
    <div>
      <div className="p-10 w-full h-[60vh] grid grid-cols-3">
        <DashCard title="Total Employee:" counting="3000" />
        <DashCard title="Pending leave:" counting="100" />
        <DashCard title="Payroll:" counting="500/3000" />
        <DashCard title="New Employee:" counting="200" />
        <div className="row-start-1 col-start-3 row-span-2 place-self-center self-center">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 100, label: "Pending Leave" },
                  { id: 1, value: 500, label: "Payroll" },
                  { id: 2, value: 200, label: "New Employee" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
