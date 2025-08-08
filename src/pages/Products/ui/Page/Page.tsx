import PageWrapper from "@/components/PageWrapper";
import { FC } from "react";
import BannerSlider from "./components/BannerSlider";

const Products: FC = () => {
  return (
    <PageWrapper>
      <section>
        <div className="">
          <BannerSlider />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
