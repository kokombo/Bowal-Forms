import FormEditNavbar from "@/components/containers/form-edit-navbar";
import { getFormDetails } from "@/lib/get-form-details";
import { redirect } from "next/navigation";

export default async function FormEditLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  const form = await getFormDetails(params.id);

  if (!form) redirect("/forms");

  return (
    <main>
      <FormEditNavbar {...form} />
      {children}
    </main>
  );
}
