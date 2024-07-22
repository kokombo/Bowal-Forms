"use client";

import Image, { type StaticImageData } from "next/image";
import { FaFileWaveform } from "react-icons/fa6";

type RecentFormProps = {
  image: string | StaticImageData;
  caption: string;
  lastOpened: string;
};

const RecentForm = ({ image, caption, lastOpened }: RecentFormProps) => {
  return (
    <button type="button">
      <div className="flex flex-col items-start rounded-sm border-1 hover:border-purple-800">
        <div className="block relative h-[185px] w-full">
          <Image
            src={image}
            alt=""
            fill
            sizes="80vw 50vw 30vw"
            className="rounded-t-sm object-contain"
          />
        </div>

        <div className="flex flex-col items-start gap-2 py-3 px-3 lg:px-4 border-t-1 w-full">
          <h5 className="text-xs lg:text-sm font-medium text-black capitalize">
            {caption}
          </h5>

          <div>
            <span className="flex items-center gap-1">
              <FaFileWaveform size={22} color="green" />
              <h6 className="text-xs font-medium text-primarytext">
                Opened {lastOpened}
              </h6>
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RecentForm;
