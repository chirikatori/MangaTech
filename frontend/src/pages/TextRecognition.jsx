import { useTextRecognition } from "../hooks/useTextRecognition";
import Sidebar from "../components/Sidebar";

const TextRecognition = () => {
    const {
        selectedImage,
        processedText,
        loading,
        error,
        modelType,
        setModelType,
        fileInputRef,
        handleFileChange,
        handleProcessText,
    } = useTextRecognition();

  return (
    <div className="flex h-screen w-screen bg-stone-900 overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-12">
          {/* Upload box */}
          <div
            className="rounded-2xl border-4 border-white overflow-hidden cursor-pointer"
            onClick={() => fileInputRef.current.click()}
            style={{
              width: `500px`,
              height: `500px`,
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
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <p className="text-white">Click here to upload image</p>
            )}
          </div>

          {/* Detect button */}
          <div className="relative cursor-pointer" onClick={handleProcessText}>
            <div className="w-36 h-12 bg-red-500 text-white flex items-center justify-center rounded-lg shadow-lg text-lg font-semibold">
              {loading ? "Processing..." : "Recognize"}
            </div>
            <div className="absolute top-1/2 left-full -translate-y-1/2 border-[20px] border-transparent border-l-red-500"></div>
          </div>

          {/* Processed text */}
          <div className="rounded-2xl border-4 border-black p-4"
              style = {{
                width: "500px",
                height: "100%",
                maxHeight: "200px",
                maxWidth: "500px",
                backgroundColor: "#4b4848ff",
                overflowY: "auto",
              }}>
            {processedText ? (
              <p className="text-white text-lg whitespace-pre-wrap">{processedText}</p>
            ) : (
              <p className="text-white text-lg text-center">Processed text will appear here</p>
            )}
          </div>
        </div>

        {/* Model Selection */}
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

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};


export default TextRecognition;
