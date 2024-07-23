"use client";

import Image from "next/image";

const ProfilePicture = ({ picture }: { picture: string }) => {
  return (
    <div className="block relative h-8 w-8 rounded-full bg-grey">
      <Image
        src={picture}
        alt="profile picture"
        fill
        className="object-contain rounded-full"
      />
    </div>
  );
};

export default ProfilePicture;
