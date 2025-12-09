import PageWrapper from "@/components/PageWrapper";
import { FC, useState } from "react";
import BannerSlider from "../components/BannerSlider";
import ProductsGrid from "../components/ProductsGrid";
import AddProductForm from "../components/AddProduct";
import Button from "@/components/Button";

const Products: FC = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  return (
    <PageWrapper>
      <section>
        <div className="">
          <Button
            variant="primary"
            className=""
            onClick={() => setShowAddProductForm(true)}
          >
            Add Product
          </Button>
          <div className="min-h-6"></div>
          <BannerSlider />
          <ProductsGrid />

          <AddProductForm
            setShowAddProductForm={setShowAddProductForm}
            isOpen={showAddProductForm}
          />
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
