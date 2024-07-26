"use client";

const SettingsPlayground = ({ theme }: Form) => {
  return (
    <div
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className=""
    >
      SettingsPlayground
      <div className="h-[1200px]" />
    </div>
  );
};

export default SettingsPlayground;
