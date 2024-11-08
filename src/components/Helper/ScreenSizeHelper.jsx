const ScreenSizeHelper = () => {
  return (
    <>
      <div className="xs:block fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white">
        XS
      </div>
      <div className="fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white sm:block">
        SM
      </div>
      <div className="fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white md:block">
        MD
      </div>
      <div className="fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white lg:block">
        LG
      </div>
      <div className="fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white xl:block">
        XL
      </div>
      <div className="fixed right-0 top-[100px] hidden bg-red-500 p-4 text-white 2xl:block">
        2XL
      </div>
    </>
  );
};

export default ScreenSizeHelper;
