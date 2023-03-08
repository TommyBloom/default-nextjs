import placeholder from "public/photo-1508705152659-209db714f16f.webp";

interface BannerProps {
  bannerTitle: string | undefined;
}

export default function BannerImage({ bannerTitle }: BannerProps) {
  return (
    <div className="relative bg-gray-900">
      {/* Decorative image and overlay */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          src={placeholder.src}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 opacity-50"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-40 lg:px-0">
        <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl">
          {bannerTitle}
        </h1>
        {/* <p className="mt-4 text-xl text-white">
            The new arrivals have, well, newly arrived. Check out the latest
            options from our summer small-batch release while they're still in
            stock.
          </p> */}
      </div>
    </div>
  );
}
