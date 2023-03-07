import Image from "next/image";
import Link from "next/link";
import { DrupalNode } from "next-drupal";

import { absoluteUrl } from "lib/utils";

interface NodeProjectTeaserProps {
  node: DrupalNode;
}

export function NodeProjectTeaser({ node, ...props }: NodeProjectTeaserProps) {
  return (
    <article {...props}>
      {node.field_teaser_image.field_media_image.image_style_uri
        .wepp_preview && (
        <figure className="my-4">
          <Image
            src={
              node.field_teaser_image.field_media_image.image_style_uri
                .wepp_preview
            }
            width={300}
            height={225}
            alt={
              node.field_teaser_image.field_media_image.resourceIdObjMeta.alt
            }
          />
        </figure>
      )}
      <Link
        href={node.path.alias}
        className="inline-flex items-center px-6 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
      >
        Read article
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 ml-2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
