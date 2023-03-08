import Head from "next/head";
import { GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "../lib/drupal";
import { Layout } from "../components/layout";
import { NodeProjectTeaser } from "../components/node--project--teaser";
import { ParsedUrlQuery } from "querystring";

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function IndexPage({ nodes }: IndexPageProps) {
  return <div>Remove Everything</div>;
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
): Promise<GetStaticPropsResult<IndexPageProps>> {
  try {
    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--project",
      context,
      {
        params: {
          "filter[status]": 1,
          "fields[node--project]":
            "title,path,field_teaser_image,body,uid,created",
          include: "field_teaser_image.field_media_image,uid",
          "fields[file--file]": "uri,url,image_style_uri",
        },
      }
    );

    return {
      props: {
        nodes,
      },
    };
  } catch (error) {
    console.error(error);
    console.error("Error fetching nodes");
    // Return an empty props object to indicate an error occurred
    return {
      props: {
        nodes: [],
      },
    };
  }
}
