"use client";

const SettingsPlayground = ({ theme }: Form) => {
  return (
    <div
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className="min-h-screen"
    >
      SettingsPlayground
    </div>
  );
};

export default SettingsPlayground;
