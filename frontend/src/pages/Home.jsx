import FAQSection from "../components/FAQSection";
import { Link } from "react-router-dom";


const Home = ({ fullScreen = true, showTitle = true, showSubtitle = false, showText = true, showButtons = true, bgType = "image", overlay = true }) => {
  const overlayColor = "rgba(0, 0, 0, 0.5)";
  const bgImage = "header.jpg";
  
  return (
    <>
    <div
      className={`relative flex ${fullScreen ? "h-screen w-screen" : "py-20 w-full"} justify-center items-center bg-cover bg-center`}
      style={{ backgroundImage: bgType === "image" ? `url(${bgImage})` : "none" }}
    >
      {overlay && (
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: overlayColor }}></div>
      )}
      <div className="relative text-center text-white px-6 md:px-12 max-w-3xl">
        {showTitle && <h1 className="text-5xl font-bold mb-4">MangaTech</h1>}
        {showSubtitle && <h2 className="text-3xl mb-4">Header Subtitle</h2>}
        {showText && (
          <p className="text-lg mb-4">
            Transforming your manga experience with OCR + Machine Translation technology!
          </p>
        )}
        {showButtons && (
          <Link
            to="/projects"
            className="inline-block px-6 py-3 border border-white text-white text-lg rounded-lg hover:bg-white hover:text-black transition"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
    <div className="mt-20">
    <FAQSection />
    </div>
  </>
  );
};

export default Home;
