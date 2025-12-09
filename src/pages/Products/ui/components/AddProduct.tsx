import { useState } from "react";
import { addProduct } from "@/services/productService";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addProduct({ name, price: Number(price) }, image);
    alert("Product added!");
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white py-24 text-center shadow-md">
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
