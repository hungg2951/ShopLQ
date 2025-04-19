import Footer from "@/components/client/footer";
import Header from "@/components/client/Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header />
      <main className="">{children}</main>
      <Footer/>
    </div>
  );
}
