import { PieChart } from "@mui/x-charts/PieChart";
import DashCard from "./DashCard.jsx"
function Dashboard() {
  return (
    <div>
      <div className="p-10 w-full h-auto gap-5 grid-cols-1 lg:h-[60vh] grid  lg:grid-cols-3">
        <DashCard title="Total Employee:" counting="3000" />
        <DashCard title="Pending leave:" counting="100" />
        <DashCard title="Payroll:" counting="500/3000" />
        <DashCard title="New Employee:" counting="200" />
        <div className="lg:row-start-1 row-start-1 lg:col-start-3 lg:row-span-2 place-self-center self-center">
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
