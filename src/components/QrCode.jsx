import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef();

  // Fonction pour télécharger le QR code
  const downloadQRCode = (e) => {
    e.preventDefault();
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = "qr-code.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  // Fonction pour encoder l'URL dans le QR code
  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6 space-y-8 md:space-y-0 md:space-x-8">
      {/* Section pour afficher le QR code en noir et blanc */}
      <div ref={qrRef} className="bg-white p-4 shadow-md rounded-lg">
        <QRCodeCanvas
          id="qrCode"
          value={url}
          size={300}
          bgColor="#ffffff"
          fgColor="#000000"
          level="H"
        />
      </div>

      {/* Section du formulaire */}
      <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <form onSubmit={downloadQRCode} className="flex flex-col space-y-6">
          <label className="text-lg font-medium text-gray-700">Entrez l'URL</label>

          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="https://tonsite.com"
            className="rounded-md border border-gray-300 py-2 px-4 shadow-sm w-full text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!url}
            className={`px-6 py-2.5 rounded-md text-white font-semibold ${
              url ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            } transition duration-300 ease-in-out shadow-md`}
          >
            Télécharger le QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
