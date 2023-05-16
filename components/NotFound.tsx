type Props = {
  param: string;
};

const NotFound = ({ param }: Props) => {
  return (
    <div className="my-auto flex items-center justify-center">
      <div className="flex items-center space-x-4">
        <h2 className="font-semibold text-2xl border-r-2 border-solid border-black p-4 py-2">
          404
        </h2>
        <h3 className="text-base font-normal">This {param} could not be found</h3>
      </div>
    </div>
  );
};

export default NotFound;
