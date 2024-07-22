import Link from "next/link";
import Logo from "../ui/logo";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type SidebarProps = {
  hideSidebar: () => void;
  sidebarIsActive: boolean;
};

const Sidebar = ({ hideSidebar, sidebarIsActive }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 w-full h-screen z-10 flex transition duration-700",
        sidebarIsActive ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col justify-between w-5/6 lg:w-2/6 bg-white shadow-2xl">
        <div
          className="px-2 lg:px-3 py-4 border-b-1"
          onClick={hideSidebar}
          onKeyDown={() => {}}
        >
          <Logo />
        </div>

        <div className="flex flex-col gap-5 fixed bottom-0 left-0 w-5/6 lg:w-2/6 px-2 lg:px-3 pb-4 lg:pb-0">
          <Link href="" className={cn(buttonVariants({ size: "lg" }))}>
            Try Forms for Work
          </Link>

          <Link
            href=""
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "text-blue"
            )}
          >
            Go to Forms
          </Link>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost", size: "lg" }),
              "text-blue"
            )}
          >
            Sign in
          </Link>
        </div>
      </div>

      <div
        className="w-1/6 lg:w-4/6 bg-transparent"
        onClick={hideSidebar}
        onKeyDown={() => {}}
      />
    </aside>
  );
};

export default Sidebar;
