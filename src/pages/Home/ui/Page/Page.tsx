import { FC } from "react";
import DashboardCards from "../components/DashboardInfoCards";
import SalesDetails from "../components/SalesDetails";
import DealsTable from "../components/DealsTable";
import PageWrapper from "@/components/PageWrapper";

const Home: FC = () => {
  return (
    <PageWrapper>
      <section>
        <div className="hero relative flex min-h-full flex-col gap-2">
          <DashboardCards />
          <SalesDetails />
          <DealsTable />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
