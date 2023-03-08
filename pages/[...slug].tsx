import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Head from "next/head";
import { DrupalNode } from "next-drupal";

import { drupal } from "@/lib/drupal";
import { NodeBasicPage } from "@/components/node--basic-page";
import { NodeProject } from "@/components/node--project";
import { Layout } from "@/components/layout";

import { DrupalJsonApiParams } from "drupal-jsonapi-params";

const RESOURCE_TYPES = ["node--page", "node--project"];

interface NodePageProps {
  resource: DrupalNode;
}

export default function NodePage({ resource }: NodePageProps) {
  if (!resource) return null;

  return (
    <Layout>
      <Head>
        <title>{resource.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      {resource.type === "node--page" && <NodeBasicPage node={resource} />}
      {resource.type === "node--project" && <NodeProject node={resource} />}
    </Layout>
  );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  const allPaths = await drupal.getStaticPathsFromContext(
    RESOURCE_TYPES,
    context
  );
  const excludedSlugs = ["/about/guiding-principles", "/projects"];
  const filteredPaths = allPaths.filter((path) => {
    if (
      typeof path !== "string" &&
      path.params &&
      Array.isArray(path.params.slug)
    ) {
      const urlPath = `/${path.params.slug.join("/")}`; // Join slug array into URL path
      return !excludedSlugs.includes(urlPath);
    }
    return true;
  });
  return {
    paths: filteredPaths,
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context);

  if (!path) {
    return {
      notFound: true,
    };
  }

  const params = new DrupalJsonApiParams();

  // I need to adjust the resouce type for projects so that custom params are sent
  // console.log("path", path.entity.bundle);

  if (path.entity.bundle === "project") {
    params
      .addFields("node--project", [
        "title",
        "path",
        "body",
        "field_project_cfs_increase",
        "field_contacts",
        "field_funders",
        "field_guiding_principles",
        "field_project_location",
        "field_project_photos",
        "field_project_updates",
        "field_project_value",
        "field_related_information",
        "field_sponsors",
        "field_project_status",
        "field_timeline",
        "field_teaser_image",
      ])
      .addFilter("status", "1")
      .addInclude(["field_teaser_image.field_media_image"])
      .addFields("file--file", ["uri", "url", "image_style_uri"])
      .addInclude([
        "field_guiding_principles.field_principle_logo.field_media_image",
      ])
      .addFields("node--guiding_principle", [
        "field_principle_logo,field_short_name",
      ])
      .addInclude(["field_funders.field_funder"])
      .addInclude(["field_project_photos.field_media_image"])
      .addInclude(["field_project_updates"])
      .addInclude(["field_timeline"])
      .addInclude(["field_contacts"])
      .addInclude(["field_related_information"])
      .addInclude(["field_related_information.field_media_document"])
      .addFields("media--link", ["field_media_entity_link"])
      .addFields("media--document", [
        "field_document_title",
        "field_media_document",
      ]);
  }

  const resource = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
      params: params.getQueryObject(),
    }
  );

  // At this point, we know the path exists and it points to a resource.
  // If we receive an error, it means something went wrong on Drupal.
  // We throw an error to tell revalidation to skip this for now.
  // Revalidation can try again on next request.
  if (!resource) {
    throw new Error(`Failed to fetch resource: ${path.jsonapi.individual}`);
  }

  // If we're not in preview mode and the resource is not published,
  // Return page not found.
  if (!context.preview && resource?.status === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resource,
    },
  };
}
