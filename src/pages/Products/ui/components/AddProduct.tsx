import { useState } from "react";
import { addProduct } from "@/services/productService";
import Button from "@/components/Button";
import { XIcon } from "lucide-react";

interface AddProductsFormProps {
  setShowAddProductForm: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

export default function AddProductForm(props: AddProductsFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addProduct({ name, price: Number(price) }, image);
    alert("Product added!");
  };

  return (
    props.isOpen && (
      <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
        <button onClick={() => props.setShowAddProductForm(false)}>X</button>

        <div className="relative flex flex-col items-center justify-center rounded-lg bg-white px-8 py-12 text-center shadow-md">
          <h2 className="mb-4 text-xl font-bold">Add Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6">
            <input
              placeholder="Product name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <Button type="submit" variant="primary" className="mt-4">
              Add Product
            </Button>
          </form>

          <button
            className="absolute right-4 top-4 h-6 w-6"
            onClick={() => props.setShowAddProductForm(false)}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    )
  );
}
