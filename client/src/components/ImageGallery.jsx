import { useState } from "react";

const ImageGallery = ({ imageUrls = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!imageUrls.length) return null;

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
            <div className="flex md:flex-col gap-3 my-auto">
                {imageUrls.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        alt={`Thumbnail ${i}`}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 object-cover border rounded-lg cursor-pointer hover:ring-2 ${selectedImage === i ? "ring-2 ring-blue-500" : ""
                            }`}
                    />
                ))}
            </div>

            <div className="flex justify-center items-center w-full">
                <img
                    src={imageUrls[selectedImage]}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default ImageGallery
