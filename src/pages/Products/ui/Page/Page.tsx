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
          <BannerSlider />
          <ProductsGrid />
          {showAddProductForm && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button onClick={() => setShowAddProductForm(false)}>X</button>
              
              <AddProductForm />
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Products;
