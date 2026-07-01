import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">
      <div className="text-center max-w-md">
        {}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-40 h-40 bg-[#f99f1d] blur-3xl opacity-30 rounded-full" />
          </div>

          <img
            src="https://i.ibb.co.com/1VyvRsS/986fdadf-8dc2-4a46-aea7-8f9002ebaed0.gif"
            alt="404 Not Found"
            className="w-96 mx-auto"
          />
        </div>

        {}
        <h2 className="text-2xl md:text-5xl font-semibold text-white mb-2">
          Page not Exist
        </h2>

        <p className="text-gray-400 mb-8 leading-relaxed">
          The you are seeking does not exist or has been moved. Please check the
          URL or return to the homepage.
        </p>

        {}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full
                     bg-[#19d253] text-black font-semibold
                     hover:scale-105 active:scale-95
                     transition-all duration-200 shadow-lg shadow-[#f99f1d]/30"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
