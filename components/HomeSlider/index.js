"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

const HomeSlider = () => {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      autoPlay
      infiniteLoop
      interval={5000}
      showThumbs={false}>
      <div className="relative md:h-[96vh] bg-secondary-light w-full">
        <Image
          alt="Zim Startup"
          src={"/images/wallpaper.webp"}
          width={2000}
          height={917}
          style={{ height: "auto" }}
        />
      </div>
    </Carousel>
  );
};

export default HomeSlider;
