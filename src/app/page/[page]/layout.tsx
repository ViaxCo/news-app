type Props = {
  children: React.ReactNode;
  params: { page: string };
};

export default function PageLayout({ children, params }: Props) {
  const { page } = params;

  return (
    <div className="flex flex-col flex-1">
      <div className="border-b-2 border-solid border-black flex items-center justify-between">
        <h2 className="ml-2 text-2xl sm:text-3xl font-semibold">Articles</h2>
        <p className="mr-2 text-sm text-grey">Page {page}</p>
      </div>
      {children}
    </div>
  );
}
