import Header from "@/components/Header";

export default function Loading() {
  return (
    <div className="w-full h-96 flex flex-col">
      <Header label="Notifications" showBackArrow />
      <div className="flex flex-col gap-4 mt-2 mx-4 ">
        <p className="h-16 w-full bg-neutral-300 animate-pulse dark:bg-neutral-600 rounded"></p>
        <p className="h-16 w-full bg-neutral-300 animate-pulse dark:bg-neutral-600 rounded"></p>
      </div>
    </div>
  );
}
