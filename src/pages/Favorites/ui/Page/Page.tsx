import PageWrapper from "@/components/PageWrapper";
import { FC } from "react";

const Favorites: FC = () => {
  return (
    <PageWrapper>
      <section>
        <div className="">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold">Favorites</h1>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Favorites;
