// GoogleTranslate.jsx
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Agar script already load ho chuka hai toh dobara mat load karo
    if (document.getElementById("google_translate_script")) return;

    const script = document.createElement("script");
    script.id = "google_translate_script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en,fr,de,es",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Hindi default select karne ke liye
        setTimeout(() => {
          const select = document.querySelector(".goog-te-combo");
          if (select) {
            select.value = "hi";
            select.dispatchEvent(new Event("change"));
          }
        }, 1500);
      }
    };

    // Navbar cut fix + banner hide
    const style = document.createElement("style");
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      body {
        top: 0px !important;
      }
      html {
        margin-top: 0px !important;
      }
      .goog-logo-link {
        display: none !important;
      }
      .goog-te-gadget {
        font-size: 14px !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return <div id="google_translate_element"></div>
};
