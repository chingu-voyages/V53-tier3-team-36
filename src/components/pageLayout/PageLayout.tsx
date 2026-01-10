import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { auth, signIn } from "@/auth/auth";
import Dialog from "../dialog/Dialog";

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;

  const handleLogin = async () => {
    "use server";
    await signIn();
  };

  return (
    <div className="page-layout-container">
      <Header handleLogin={handleLogin} isLoggedIn={!!user} />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {children}
      </div>
      <Footer />
      <Dialog loggedIn={Boolean(user)} />
    </div>
  );
}
