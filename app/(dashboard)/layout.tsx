import Header from "@/components/Header";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <Header/>
      {/* <p> Dashboard layout</p>
      <nav>Navigation</nav> */}
      <main className="px-4 lg:px-12">{children}</main>
    </section>
  );
}