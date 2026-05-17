import Carousel from "../ui/Carousel";
import GALLERY_IMAGES from "@/data/gallery.json";

export default function GallerySection() {
    return (
        <section className="py-20 md:py-32 bg-white dark:bg-grey-900 overflow-hidden">
            <div className="page-wrapper">
                <h2 className="text-3xl md:text-5xl font-bold text-[#1b1b21] dark:text-[#e2e2e9] mb-12 tracking-tight text-center flex flex-col items-center">
                    <span>Memories that made us shout</span>
                    <span className="text-7xl md:text-[120px] leading-none text-[#2c5fd9] mt-2 md:mt-4 tracking-tighter">WOW!</span>
                </h2>
                <div 
                    className="w-full max-w-6xl mx-auto h-[400px] md:h-[600px] bg-white dark:bg-[#191c21] rounded-[24px] overflow-hidden shadow-sm flex flex-col"
                    style={{
                        borderTop: '6px solid #4285F4',
                        borderRight: '6px solid #EA4335',
                        borderBottom: '6px solid #FBBC04',
                        borderLeft: '6px solid #34A853',
                    }}
                >
                    <Carousel images={GALLERY_IMAGES} />
                </div>
            </div>
        </section>
    );
}
