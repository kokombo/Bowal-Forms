import SignInDialog from "@/components/dialogs/sign-in-dialog";
import { getServerSession } from "@/lib/getServerSession";

export default async function FormEditLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div>
      {children}
      {!session && <SignInDialog />}
    </div>
  );
}
