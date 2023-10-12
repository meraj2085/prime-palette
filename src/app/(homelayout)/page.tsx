import heroImage from "../../assets/heroImage.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <div className="relative">
        <Image
          className="w-full max-h-[800px]"
          src={heroImage}
          width={10000}
          alt="Hero image"
        />
        <div className="absolute top-1/2 left-[700px] transform -translate-y-1/2">
          <div>
            <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl md:leading-tight md:font-extrabold">
              Quality Wallpapers
            </h1>
            <h1 className="text-2xl ms-7">Paintings For Home</h1>
          </div>
          <div className="mt-10 flex flex-col justify-start mb-3 space-x-0 space-y-2 text-xs text-gray-600 md:flex-row md:justify-center md:space-x-8 md:space-y-0">
            <div className="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              No commitment
            </div>
            <div className="flex items-center">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1 text-green-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
