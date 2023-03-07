import Image from "next/image";
import Link from "next/link";

export default function ProjectCards(data) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Projects</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {data.data.map((project) => (
            <div key={project.id}>
              <div className="relative">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={
                      project.field_teaser_image.field_media_image
                        .image_style_uri.webp
                    }
                    alt={
                      project.field_teaser_image.field_media_image
                        .resourceIdObjMeta.alt
                    }
                    height={225}
                    width={300}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="overlay-icons grid grid-cols-8 gap-1">
                    {project.field_guiding_principles.map((gp) => (
                      <div className="overlay-icon" key={gp.id}>
                        <Image
                          src={
                            gp.field_principle_logo.field_media_image
                              .image_style_uri.geofield_map_default_icon_style
                          }
                          alt={
                            gp.field_principle_logo.field_media_image
                              .resourceIdObjMeta.alt
                          }
                          height={35}
                          width={35}
                          className=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.body.summary}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={project.path.alias}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  More Information
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
