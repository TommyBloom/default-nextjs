import Head from "next/head";
import { DrupalNode } from "next-drupal";

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
        {/* {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <h2 className="mb-4 text-4xl font-bold">
                <a href={node.path.alias}>{node.title}</a>
              </h2>

              <div dangerouslySetInnerHTML={{ __html: node.body.processed }} />
              <hr className="my-20" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )} */}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {},
  };
}
