import { db, storage } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addProduct = async (productData: any, imageFile: File | null) => {
  try {
    let imageUrl = "";

    if (imageFile) {
      const imgRef = ref(storage, `products/${imageFile.name}-${Date.now()}`);
      await uploadBytes(imgRef, imageFile);
      imageUrl = await getDownloadURL(imgRef);
    }

    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      imageUrl,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
