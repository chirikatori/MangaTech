import { useState, useRef, useEffect } from "react";
import axios from "axios";

export const useTextDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelType, setModelType] = useState("magi");
  const fileInputRef = useRef(null);

  // Cleanup ảnh khi reload/thoát
  useEffect(() => {
    const handleUnload = async () => {
      if (fileInputRef.current?.files?.[0]) {
        const filename = fileInputRef.current.files[0].name;
        const processedfileName = `result_${filename}`;
        try {
          await navigator.sendBeacon(
            `http://localhost:8000/api/image/${filename}/delete`,
            null
          );
        } catch (e) {
          console.error("Failed to send beacon delete:", e);
        }
        try {
          await navigator.sendBeacon(
            `http://localhost:8000/api/image/${processedfileName}/delete`,
            null
          );
        } catch (e) {
          console.error("Failed to send beacon delete:", e);
        }
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      handleUnload();
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // Upload file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
    setProcessedImage("");

    const img = new Image();
    img.src = imageURL;
  };

  // Xử lý gọi API detect
  const handleProcessImage = async () => {
    if (!fileInputRef.current.files[0]) return;
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const response = await axios.post(
        `http://localhost:8000/text-detection?model_type=${modelType}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setProcessedImage("http://localhost:8000" + response.data.processed_image_url);
    } catch (err) {
      setError("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedImage,
    processedImage,
    loading,
    error,
    modelType,
    setModelType,
    fileInputRef,
    handleFileChange,
    handleProcessImage,
  };
};

