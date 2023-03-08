import Head from "next/head";

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

export async function getStaticProps() {
  return {
    props: {
      test: "test",
    },
  };
}
