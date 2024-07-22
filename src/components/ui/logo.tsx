import { FaFileWaveform } from "react-icons/fa6";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1 items-center">
      <FaFileWaveform size={36} color="green" />
      <h4 className="text-lg lg:text-xl text-primarytext font-medium">
        Bowal Forms
      </h4>
    </Link>
  );
};

export default Logo;
