import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/common/footer/footer";
import { getCurrentUser } from "@/lib/curentUser";

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />

      <main className="min-h-screen pt-24">
        {children}
      </main>

      <Footer />
    </>
  );
}