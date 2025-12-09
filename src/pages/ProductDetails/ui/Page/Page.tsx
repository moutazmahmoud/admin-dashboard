import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProducts as products } from "@/lib/MockData";
import Rating from "@/components/Rating";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) {
      // If product not found, navigate back to products page after 2 seconds
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  }, [product, navigate]);

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ImageGallery images={product.images} />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="text-sm text-gray-500">#{product.id}</div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Rating rating={product.rating} />
            <div className="text-sm text-gray-500">
              {product.reviewsCount} reviews
            </div>
          </div>

          <div className="mt-4 text-3xl font-semibold">
            ${product.price.toFixed(2)}
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 flex gap-3">
            <button className="rounded-lg bg-black px-4 py-2 text-white">
              Add to Cart
            </button>
            <button className="rounded-lg border px-4 py-2">
              Add to Favorites
            </button>
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-semibold">Product Details</h4>
            <ul className="list-inside list-disc text-sm text-gray-600">
              <li>Category: Coffee</li>
              <li>Stock: In Stock</li>
              <li>SKU: PROD-{product.id}</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-sm text-gray-600"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">Related Products</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((p) => p.id !== product.id)
            .map((p) => (
              <div
                key={p.id}
                className="rounded-lg bg-white p-3 shadow cursor-pointer"
                onClick={() => navigate(`/products/${p.id}`)}
              >
                <div
                  className="h-28 rounded-md bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${p.images[0]}')` }}
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-sm text-gray-500">
                    ${p.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="h-80 w-full overflow-hidden rounded-xl bg-white py-4">
        <img
          src={images[index]}
          alt={`product-${index}`}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-3 flex gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`h-14 w-20 overflow-hidden rounded-md border ${
              i === index ? "ring-2 ring-black" : ""
            }`}
          >
            <img
              src={src}
              alt={`thumb-${i}`}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
