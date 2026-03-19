"use client";

import React, { useState, useEffect, useRef } from "react";
import mainData from "@/data/config.json";
import { MdArrowDownward, MdUpload } from "react-icons/md"; // Using react-icons for the icons

// Assuming badge.png and frame.png are in your public/assets/img directory
const bannerImagePath = "/common/badge.png"; // Path relative to public directory
const bannerOriginalImagePath = "/common/badge_original.png"; // Path relative to public directory
const bannerCircleImagePath = "/common/badge_circle.png"; // Path relative to public directory

function BadgePage() {
  useEffect(() => {
    document.title = `Badge - ${mainData.eventInfo.name} | ${mainData.communityName}`;
    document
      .querySelector("meta[property='og:title']")
      ?.setAttribute(
        "content",
        `Badge - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
    document
      .querySelector("meta[name='twitter:title']")
      ?.setAttribute(
        "content",
        `Badge - ${mainData.eventInfo.name} | ${mainData.communityName}`
      );
  }, []); // Set title and meta tags on component mount

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shapeData, setShapeData] = useState("original");
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [banner, setBanner] = useState<HTMLImageElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      setCtx(context);

      const bannerImg = new Image();
      bannerImg.src = bannerImagePath; // Use path relative to public
      bannerImg.onload = () => {
        setBanner(bannerImg);
      };
      // No need to explicitly call draw here, it will be called when banner state updates
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      setCtx(context);

      const bannerImg = new Image();
      bannerImg.src =
        shapeData === "original"
          ? bannerOriginalImagePath
          : shapeData === "circle"
          ? bannerCircleImagePath
          : bannerImagePath; // Use path relative to public
      bannerImg.onload = () => {
        setBanner(bannerImg);
      };
      // No need to explicitly call draw here, it will be called when banner state updates
    }
  }, [shapeData]);

  // Effect to redraw when image, banner, shapeData, or ctx changes
  useEffect(() => {
    if (ctx && canvasRef.current && banner) {
      draw();
    }
  }, [image, banner, shapeData, ctx]); // Dependencies

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        if (event.target?.result) {
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
    setDownloadVisible(true);
  };

  const draw = () => {
    if (!canvasRef.current || !ctx || !banner) {
      return;
    }

    const canvas = canvasRef.current;

    // Default canvas size for Square/Circle if no image uploaded yet, or always if not 'original'
    if (shapeData !== "original" || !image) {
      canvas.width = 2500;
      canvas.height = 2500;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw white background if no image is loaded
    if (!image) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (image) {
      drawImage();
    }

    // Save context state before applying clip/shape
    ctx.save();

    // Apply shape mask *before* drawing the banner if shape is circle
    if (shapeData === "circle") {
      applyShape();
    }

    // Draw banner
    drawBanner();
    if (shapeData === "circle") {
      applyShape();
    }
    // Restore context state after applying clip/shape
    ctx.restore();
  };

  const drawImage = () => {
    if (!canvasRef.current || !ctx || !image) return;
    const canvas = canvasRef.current;

    if (shapeData === "original") {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
    } else {
      // Square or Circle fit/cover logic
      canvas.width = 2500;
      canvas.height = 2500;
      const hRatio = canvas.width / image.width;
      const vRatio = canvas.height / image.height;
      const ratio = Math.max(hRatio, vRatio);
      const x = (canvas.width - image.width * ratio) / 2;
      const y = (canvas.height - image.height * ratio) / 2;

      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        x,
        y,
        image.width * ratio,
        image.height * ratio
      );
    }
  };

  const drawBanner = () => {
    if (!canvasRef.current || !ctx || !banner) return;
    const canvas = canvasRef.current;
    const isOriginalShape = shapeData === "original";
    // Banner needs to cover the full width of the *current* canvas size
    const bannerHeight =
      (banner.height / banner.width) *
      canvas.width *
      (isOriginalShape ? 0.7 : 1);
    const bannerY = canvas.height - bannerHeight; // Position at the bottom

    ctx.drawImage(
      banner,
      0,
      0,
      banner.width,
      banner.height, // Source dimensions
      0,
      bannerY,
      canvas.width * (isOriginalShape ? 0.7 : 1), // Destination width
      bannerHeight // Destination dimensions
    );
  };

  const applyShape = () => {
    if (ctx === null) return;
    if (!canvasRef.current || !ctx || shapeData !== "circle") {
      // If not circle shape, ensure composite operation is default 'source-over'
      // This is important if a previous draw used a different composite mode
      ctx.globalCompositeOperation = "source-over";
      return; // Do not apply shape mask
    }

    const canvas = canvasRef.current;

    // Set composite operation to destination-in
    // This means new shapes will only be drawn where they overlap existing content,
    // and the non-overlapping existing content will be erased.
    ctx.globalCompositeOperation = "destination-in";

    // Define the circle path centered on the canvas
    ctx.beginPath();
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // Original Nuxt used canvas.height / 2 for radius. Let's match that.
    // For a 2500x2500 canvas, this is 1250.
    const radius = canvas.height / 2;

    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();

    // Fill the circle path. Because globalCompositeOperation is "destination-in",
    // this fill operation acts as the mask for the previously drawn content (image + banner).
    ctx.fill();

    // Reset composite operation back to default 'source-over' for any future drawing operations
    ctx.globalCompositeOperation = "source-over";
  };

  const handleShapeChange = (type: string) => {
    setShapeData(type);
  };

  const download = () => {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    const url = canvasRef.current.toDataURL("image/png;base64");
    a.download = "badge.png";
    a.href = url;
    a.click();
  };

  const shapes = ["original", "Square", "circle"];

  return (
    <>
      {/* Assuming a default layout wrapper is provided externally */}
      {/* Corresponds to <NuxtLayout name="default"> <v-container fluid class=" fill-height"> */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {" "}
        {/* Added fill-height, justify-center, align-center */}
        <div className="flex flex-wrap -mx-4 w-full">
          {" "}
          {/* v-row */}
          <div className="w-full md:w-1/2 sm:w-7/12 px-4">
            {" "}
            {/* v-col md="6" sm="7" cols="12" */}
            <h1 className="text-3xl font-bold mb-2">Badge</h1>
            <p className="mt-2">
              Upload an image and generate a personalized badge with the WOW
              frame.
            </p>
            <p className="mt-8 font-semibold">Select an Image</p>
            <button
              className="mt-4 mb-5 px-6 py-3 text-black bg-yellow-400 cursor-pointer rounded-full border-2 border-gray-900 hover:bg-yellow-500 transition duration-200 ease-in-out flex items-center"
              onClick={triggerFileUpload}
            >
              Upload Image
              <MdUpload className="ml-2 text-xl" /> {/* Using react-icons */}
            </button>
            <input
              ref={fileInputRef}
              className="profile-input"
              type="file"
              accept="image/*"
              onChange={upload}
              hidden
            />
            <div className="mt-5">
              <label className="block text-sm font-semibold mb-2">
                Image Shape
              </label>
              {/* v-btn-toggle */}
              <div className="mt-3 inline-flex rounded-lg border-2 border-gray-900 overflow-hidden">
                {" "}
                {/* Simulate rounded border toggle group */}
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    className={`cursor-pointer px-5 py-2 text-sm  capitalize
                        ${
                          shapeData === shape
                            ? "bg-gray-300 dark:bg-gray-700 font-medium"
                            : "bg-transparent"
                        }
                        border-r-2 last:border-r-0 border-gray-900
                        hover:bg-gray-100 dark:hover:bg-gray-600
                     `}
                    onClick={() => handleShapeChange(shape)}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-8 mb-8 md:mb-0 text-sm text-gray-600">
              <span>
                *  We respect your privacy and are not storing your pictures on
                our servers.
              </span>
            </p>
          </div>
          <div className="w-full md:w-1/2 sm:w-5/12 px-4 md:px-10">
            {" "}
            {/* v-col md="6" sm="5" cols="12" class="px-md-10" */}
            <div className="bg-gray-200 rounded-xl border-2 border-black text-center p-5 md:p-5 py-10 md:py-10">
              {" "}
              {/* Adjusted padding */}
              <canvas
                ref={canvasRef}
                className="w-full max-w-full rounded-xl"
                style={{ height: "auto" }}
              ></canvas>{" "}
              {/* Added max-w-full and height: auto for responsiveness */}
              {downloadVisible && (
                <button
                  className="cursor-pointer mt-4 py-2 px-4 rounded-full bg-blue-500 text-white font-semibold flex items-center justify-center mx-auto hover:bg-blue-600 transition duration-200"
                  onClick={download}
                >
                  <MdArrowDownward className="mr-1 text-xl" />{" "}
                  {/* Using react-icons */}
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End of container wrapper */}
    </>
  );
}

export default BadgePage;
