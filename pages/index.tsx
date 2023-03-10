import Head from "next/head";
import { GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import { DrupalNode } from "next-drupal";

import { drupal } from "../lib/drupal";
import { ParsedUrlQuery } from "querystring";
import { NodeProjectTeaser } from "../components/node--project--teaser";

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function IndexPage({ nodes }: IndexPageProps) {
  return (
    <>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        <h1 className="mb-10 text-6xl font-black">Latest Articles.</h1>
        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <h2 className="mb-4 text-4xl font-bold">
                <a href={node.path.alias}>{node.title}</a>
              </h2>

              <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
              <hr className="my-20" />
              <NodeProjectTeaser node={node} />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}
      </div>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
): Promise<GetStaticPropsResult<IndexPageProps>> {
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
}
