import ErrorPageContent from "./ErrorPageContent";

const ErrorPage = () => {
  return (
    <>
      <section className="our-error bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <ErrorPageContent />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
