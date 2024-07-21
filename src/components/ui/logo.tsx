import { FaFileWaveform } from "react-icons/fa6";

const Logo = () => {
  return (
    <span className="flex gap-1 items-center">
      <FaFileWaveform size={36} color="green" />
      <h4 className="lg:text-xl text-primarytext font-medium">Bowal Forms</h4>
    </span>
  );
};

export default Logo;
