import PageWrapper from "@/components/PageWrapper";
import { FC } from "react";
import BannerSlider from "./components/BannerSlider";
import ProductsGrid from "./components/ProductsGrid";

const Products: FC = () => {
  return (
    <PageWrapper>
      <section>
        <div className="">
          <BannerSlider />
          <ProductsGrid />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
