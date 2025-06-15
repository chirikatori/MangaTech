import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const TextDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modelType, setModelType] = useState("magi");
  const [imageSize, setImageSize] = useState({width: 650, height: 650});
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleUnload = async () => {
      if (fileInputRef.current?.files?.[0]) {
        const filename = fileInputRef.current.files[0].name;
        console.log(filename);
        try {
          await navigator.sendBeacon(
            `http://localhost:8000/api/image/${filename}`,
            null
          ); // Gửi request kiểu beacon
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

  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setProcessedImage("");
    }
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
    img.src = imageURL;
  };

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
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "json",
        }
      );
      const data = response.data;
      console.log("Response data:", data);
      setProcessedImage("http://localhost:8000" + data.processed_image_url);
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-stone-900 overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-12">
        <div
          className="rounded-2xl border-4 border-white overflow-hidden cursor-pointer"
          onClick={handleBoxClick}
          style={{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            backgroundColor: "#a3a3a3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{
                width: `${imageSize.width}px`,
                height: `${imageSize.height}px`,
              }}
            />
          ) : (
            <p className="text-white">Click here to upload image</p>
          )}
        </div>

          <div className="relative cursor-pointer" onClick={handleProcessImage}>
            <div className="w-36 h-12 bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg text-lg font-semibold">
              {loading ? "Processing..." : "Detect"}
            </div>
            <div className="absolute top-1/2 left-full -translate-y-1/2 border-[20px] border-transparent border-l-red-500"></div>
          </div>

          <div className="rounded-2xl border-4 border-white overflow-hidden"
           style={{
            width: `${imageSize.width}px`,
            height: `${imageSize.height}px`,
            backgroundColor: "#a3a3a3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {loading ? (
              <p className="text-white text-lg">Processing...</p>
            ) : processedImage ? (
              <img src={processedImage}
                   alt="Processed"
                   style={{
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                  }} />
            ) : (
              <p className="text-white">Processed Image</p>
            )}
          </div>
        </div>
        <div className="font-bold text-white">Model Selection</div>
        <select
          className="bg-gray-800 text-white p-2 rounded-md"
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
        >
          <option value="magi">Magi</option>
          <option value="easyocr">EasyOCR</option>
        </select>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default TextDetection;
