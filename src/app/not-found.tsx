import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <h2 className="font-semibold text-2xl border-r-2 border-solid border-black p-4 py-2">
          404
        </h2>
        <h3 className="text-base font-normal">This page could not be found</h3>
      </div>
      <div className="font-semibold underline mt-2">
        <Link href="/page/1">Go back home</Link>
      </div>
    </div>
  );
}
