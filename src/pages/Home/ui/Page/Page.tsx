import { FC } from "react";
import DashboardCards from "../components/DashboardInfoCards";
import SalesDetails from "../components/SalesDetails";
import DealsTable from "../components/DealsTable";

const Home: FC = () => {
  return (
    <>
      <section>
        <div className="hero min-h-full relative flex flex-col gap-2">
          <DashboardCards />
          <SalesDetails />
          <DealsTable />
        </div>
      </section>
    </>
  );
};

export default Home;
