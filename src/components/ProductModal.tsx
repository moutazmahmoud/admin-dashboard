import { Product } from "@/types/Product";
import React from "react";

export const ProductModal = ({
  open,
  onClose,
  initialProduct,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  initialProduct?: Product | null;
  onSave: (data: Omit<Product, "id"> & { id?: number }) => void;
}) => {
  const [form, setForm] = React.useState<Omit<Product, "id"> & { id?: number }>(
    initialProduct ?? {
      name: "",
      description: "",
      images: [],
      price: 0,
      rating: 0,
      reviewsCount: 0,
      id: undefined,
    },
  );

  React.useEffect(() => {
    if (initialProduct) setForm(initialProduct);
  }, [initialProduct]);

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="animate-scaleIn w-full max-w-xl space-y-4 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">
          {form.id ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <textarea
            className="w-full rounded border p-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
          />

          <input
            className="w-full rounded border p-2"
            type="number"
            placeholder="Rating (0-5)"
            value={form.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
          />

          <input
            className="w-full rounded border p-2"
            type="number"
            placeholder="Reviews Count"
            value={form.reviewsCount}
            onChange={(e) =>
              handleChange("reviewsCount", Number(e.target.value))
            }
          />

          <input
            className="w-full rounded border p-2"
            placeholder="Image URLs (comma separated)"
            value={form.images.join(", ")}
            onChange={(e) =>
              handleChange(
                "images",
                e.target.value.split(",").map((i) => i.trim()),
              )
            }
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="rounded bg-gray-200 px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
