import Link from "next/link";

const ErrorComponent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold text-center">Something went wrong!</h2>
      <div className="my-6 flex gap-6">
        {children}
        <Link href="/page/1">
          <button className="btn btn-blue font-normal">Go back home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorComponent;
