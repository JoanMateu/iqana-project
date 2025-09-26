import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-800">
      <Header />
      <main className="pt-16">{children}</main>
    </div>
  );
}
