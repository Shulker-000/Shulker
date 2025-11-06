import React, { useEffect } from "react";
import {
  BackgroundFiltersProvider,
  useBackgroundFilters,
} from "@stream-io/video-react-sdk";
import { toast } from "react-toastify";
import { X, Image as ImageIcon, Droplet } from "lucide-react";
import Beach from "./../assets/images/bg/beach.png";
import ClassRoom from "./../assets/images/bg/classroom.png";
import Library from "./../assets/images/bg/library.png";
import LivingRoom from "./../assets/images/bg/livingRoom.png";
import Mountain from "./../assets/images/bg/mountain.png";
import Nature from "./../assets/images/bg/nature.png";
import Office from "./../assets/images/bg/office.png";
import Office2 from "./../assets/images/bg/office_2.png";
import Office3 from "./../assets/images/bg/office_3.png";
import Space from "./../assets/images/bg/space.png";

// Utility: Flip image horizontally (mirror)
async function flipImageHorizontally(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (e) => reject(new Error("Image failed to load: " + src));
    img.src = src;
  });
}

function BackgroundSelector() {
  const {
    isSupported,
    isReady,
    disableBackgroundFilter,
    applyBackgroundBlurFilter,
    applyBackgroundImageFilter,
  } = useBackgroundFilters();

  // ✅ Predefined virtual backgrounds
  const virtualBackgrounds = [
    {
      name: "Beach",
      src: Beach,
    },
    {
      name: "ClassRoom",
      src: ClassRoom,
    },
    {
      name: "Library",
      src: Library,
    },
    {
      name: "Living Room",
      src: LivingRoom,
    },
    {
      name: "Mountain",
      src: Mountain,
    },
    {
      name: "Nature",
      src: Nature,
    },
    {
      name: "Office 1",
      src: Office,
    },
    {
      name: "Office 2",
      src: Office2,
    },
    {
      name: "Office 3",
      src: Office3,
    },
    {
      name: "Space",
      src: Space,
    },
  ];

  // --- Unsupported devices ---
  if (!isSupported)
    return (
      <div className="absolute bottom-20 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md text-sm">
        🚫 Background filters are not supported on this device.
      </div>
    );

  // --- Loading state ---
  if (!isReady)
    return (
      <div className="absolute bottom-20 right-4 bg-black/70 border border-gray-400 rounded-xl p-4 shadow-lg text-white text-sm">
        <div className="animate-spin border-t-2 border-blue-400 rounded-full w-6 h-6 mx-auto mb-2" />
        Loading background filters...
      </div>
    );

  // --- Ready UI ---
  return (
    <div className="absolute bottom-20 right-4 z-50 bg-white/95 border border-gray-200 shadow-xl rounded-2xl p-4 w-[320px] backdrop-blur-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <ImageIcon size={18} />
        Background Effects
      </h3>

      {/* Blur Options */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={disableBackgroundFilter}
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium transition"
        >
          <X size={16} className="inline mr-1" />
          None
        </button>

        <button
          onClick={() => applyBackgroundBlurFilter("low")}
          className="px-3 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium transition"
        >
          <Droplet size={14} className="inline mr-1" />
          Blur (Low)
        </button>

        <button
          onClick={() => applyBackgroundBlurFilter("medium")}
          className="px-3 py-2 rounded-lg bg-blue-200 hover:bg-blue-300 text-blue-900 text-sm font-medium transition"
        >
          <Droplet size={14} className="inline mr-1" />
          Blur (Medium)
        </button>

        <button
          onClick={() => applyBackgroundBlurFilter("high")}
          className="px-3 py-2 rounded-lg bg-blue-300 hover:bg-blue-400 text-black text-sm font-medium transition"
        >
          <Droplet size={14} className="inline mr-1" />
          Blur (High)
        </button>
      </div>

      {/* Virtual Backgrounds */}
      <div className="mt-2">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">
          Virtual Backgrounds
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {virtualBackgrounds.map((bg) => (
            <div
              key={bg.name}
              className="cursor-pointer group relative rounded-xl overflow-hidden border border-gray-300 hover:scale-[1.03] transition-transform"
              onClick={async () => {
                const flippedImage = await flipImageHorizontally(bg.src);
                try {
                  applyBackgroundImageFilter(flippedImage);
                } catch (err) {
                  toast.error("Failed to apply background: " + err.message);
                }
              }}
            >
              <img
                src={bg.src}
                alt={bg.name}
                className="w-full h-20 object-cover group-hover:brightness-90 transition"
              />
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-md">
                {bg.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------
   Wrapper Component: BackgroundFilters
------------------------------------------ */
const BackgroundFilters = ({ children, showSelector = false }) => {
  return (
    <BackgroundFiltersProvider
      availableFilters={["none", "blur", "virtual_background"]}
      onError={(error) => {
        toast.error(`Filter Error: ${error.message}`);
      }}
    >
      {children}
      {showSelector && <BackgroundSelector />}
    </BackgroundFiltersProvider>
  );
};

export default BackgroundFilters;
