// GoogleTranslate.jsx
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Script create karo
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    // Google init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

   return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 999,
        background: "#fff",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "0 0 5px rgba(0,0,0,0.3)"
      }}
    ></div>
  );
}