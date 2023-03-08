import Head from "next/head";
import { GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

interface IndexPageProps {
  test: string;
}

export default function IndexPage({ test }: IndexPageProps) {
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
      </div>
    </>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext<ParsedUrlQuery, PreviewData>
) {
  return {
    props: {
      test: "test",
    },
  };
}
