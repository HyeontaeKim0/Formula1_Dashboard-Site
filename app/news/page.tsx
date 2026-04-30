import NewsSection from "@/components/common/newsSection/NewsSection";
export default function NewsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full min-w-0 max-w-[100vw] justify-center bg-[#f4f1ea] px-3 py-6 transition-all duration-300 animate-fade-in sm:px-[5%] sm:py-8">
      <div className="w-full min-w-0 max-w-full">
        <NewsSection />
      </div>
    </div>
  );
}
