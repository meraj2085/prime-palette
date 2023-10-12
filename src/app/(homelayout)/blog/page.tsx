const BlogPage = () => {
  return (
    <section className="min-h-screen max-w-[1200px] mx-auto">
      <div className="container px-6 py-10 mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl lg:font-bold ">
            Blo<span className="text-teal-600">g</span>
          </h1>

          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Our most popular blogs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <article className="flex flex-col ">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Te nulla oportere reprimique his dolorum"
            >
              <img
                alt=""
                className="object-cover w-full h-52 "
                src="https://source.unsplash.com/200x200/?fashion?1"
              />
            </a>
            <div className="flex flex-col flex-1 p-6">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Te nulla oportere reprimique his dolorum"
              ></a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs tracki uppercase hover:underline"
              >
                Convenire
              </a>
              <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                Te nulla oportere reprimique his dolorum
              </h3>
              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
                <span>June 1, 2020</span>
                <span>2.1K views</span>
              </div>
            </div>
          </article>
          <article className="flex flex-col ">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Te nulla oportere reprimique his dolorum"
            >
              <img
                alt=""
                className="object-cover w-full h-52 "
                src="https://source.unsplash.com/200x200/?fashion?2"
              />
            </a>
            <div className="flex flex-col flex-1 p-6">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Te nulla oportere reprimique his dolorum"
              ></a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs tracki uppercase hover:underline "
              >
                Convenire
              </a>
              <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                Te nulla oportere reprimique his dolorum
              </h3>
              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs ">
                <span>June 2, 2020</span>
                <span>2.2K views</span>
              </div>
            </div>
          </article>
          <article className="flex flex-col">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Te nulla oportere reprimique his dolorum"
            >
              <img
                alt=""
                className="object-cover w-full h-52"
                src="https://source.unsplash.com/200x200/?fashion?3"
              />
            </a>
            <div className="flex flex-col flex-1 p-6">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Te nulla oportere reprimique his dolorum"
              ></a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs tracki uppercase hover:underline"
              >
                Convenire
              </a>
              <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                Te nulla oportere reprimique his dolorum
              </h3>
              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
                <span>June 3, 2020</span>
                <span>2.3K views</span>
              </div>
            </div>
          </article>
          <article className="flex flex-col ">
            <a
              rel="noopener noreferrer"
              href="#"
              aria-label="Te nulla oportere reprimique his dolorum"
            >
              <img
                alt=""
                className="object-cover w-full h-52"
                src="https://source.unsplash.com/200x200/?fashion?4"
              />
            </a>
            <div className="flex flex-col flex-1 p-6">
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="Te nulla oportere reprimique his dolorum"
              ></a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs tracki uppercase hover:underline"
              >
                Convenire
              </a>
              <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                Te nulla oportere reprimique his dolorum
              </h3>
              <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs">
                <span>June 4, 2020</span>
                <span>2.4K views</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
