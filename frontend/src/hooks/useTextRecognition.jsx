import { useState, useRef, useEffect } from "react";
import axios from "axios";

export const useTextRecognition = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [processedText, setProcessedText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modelType, setModelType] = useState("magi");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const handleUnload = async () => {
            if (fileInputRef.current?.files?.[0]) {
                const filename = fileInputRef.current.files[0].name;
                const file_name_without_ext = filename.replace(/\.[^/.]+$/, "");
                const processedfileName = `result_${file_name_without_ext}.txt`;
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
                        `http://localhost:8000/api/output/${processedfileName}/delete`,
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const imageURL = URL.createObjectURL(file);
        setSelectedImage(imageURL);
        setProcessedText("");

        const img = new Image();
        img.src = imageURL;
    };

    const handleProcessText = async () => {
        if (!fileInputRef.current.files[0]) return;
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", fileInputRef.current.files[0]);

        try {
            const response = await axios.post(
                `http://localhost:8000/text-recognition?model_type=${modelType}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const result = await axios.get(
                `http://localhost:8000${response.data.processed_text_url}`,
            );

            setProcessedText(result.data.content);
        } catch (error) {
            setError("Failed to process image");
        } finally {
            setLoading(false);
        }
    };

    return {
        selectedImage,
        processedText,
        loading,
        error,
        modelType,
        setModelType,
        fileInputRef,
        handleFileChange,
        handleProcessText,
    };
};
