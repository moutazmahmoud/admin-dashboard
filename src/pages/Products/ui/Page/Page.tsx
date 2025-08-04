import PageWrapper from "@/components/PageWrapper";
import { FC } from "react";
import Slider from "./components/Slider";

const Products: FC = () => {
  return (
    <PageWrapper>
      <section>
        <div className="">
          <Slider />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
