import Image from "next/image";

export default function GridCard(data) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.data.map((card) => (
        <div
          key={card.id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            <Image
              className="h-20 w-20"
              src={
                card.field_principle_logo.field_media_image.image_style_uri
                  .wepp_preview
              }
              alt=""
              width="200"
              height="200"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{card.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: card.field_principle_description.processed,
              }}
              className="truncate text-sm text-gray-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
