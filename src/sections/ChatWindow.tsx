import InputBar from "@/components/InputBar";

export default function ChatWindow() {
  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-gray-200 mb-6">
        What are you working on?
      </h1>
      <InputBar />
    </section>
  );
}
