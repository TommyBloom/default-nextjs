import { DrupalNode } from "next-drupal";
import BannerImage from "components/bannerimage";

import Image from "next/image";

import Gallery from "components/gallery";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface NodeProjectProps {
  node: DrupalNode;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};

import Link from "next/link";

export function NodeProject({ node, ...props }: NodeProjectProps) {
  const sponsors = node.field_sponsors.map((sponsor) => sponsor).join(", ");

  const fieldAmounts = [];
  const fieldTitles = [];

  // Loop through the array of objects
  node.field_funders.forEach((obj) => {
    // Extract the field_amount and title values and push them to their respective arrays
    const { field_amount, field_funder } = obj;
    fieldAmounts.push(field_amount);
    fieldTitles.push(field_funder.title);
  });

  const data = {
    labels: fieldTitles,
    datasets: [
      {
        label: "Amount Funded",
        data: fieldAmounts,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };

  return (
    <article {...props}>
      {/* {console.log(node)} */}
      <BannerImage bannerTitle={node.title} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 m-6 md:shrink-0">
        <div className="mx-auto">
          <div className="md:flex">
            <div className="">
              <div className="tracking-wide text-sm">
                <h1 className="mb-4 text-3xl font-black leading-tight">
                  {node.title}
                </h1>
                <p>
                  <span className="font-semibold">Project Status:</span>
                  {node.field_project_status}
                </p>
                <p>Project Sponsors: {sponsors}</p>

                <p>Project Funders: {node.field_project_status}</p>

                <p>Project Summary: </p>
                {node.body?.processed && (
                  <div
                    dangerouslySetInnerHTML={{ __html: node.body?.processed }}
                  />
                )}
                <div>Guiding Principles Met:</div>
                {node.field_guiding_principles.map((principle) => (
                  <div key={principle.id}>
                    <div className="float-left mr-2">
                      <Image
                        src={
                          principle.field_principle_logo.field_media_image
                            .image_style_uri.webp
                        }
                        alt={
                          principle.field_principle_logo.field_media_image
                            .resourceIdObjMeta.alt
                        }
                        height={50}
                        width={50}
                        className="h-12 w-12"
                      />
                      <div className="text-xs">
                        {principle.field_short_name}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4 h-60 clear-both	">
                  <Pie data={data} options={options} />
                </div>
              </div>
            </div>
            <div className="m-6 md:shrink-0">
              <div className="mb-3">Project Timeline</div>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {node.field_timeline.map((edge) => (
                  <li className="mb-10 ml-4" key={edge.id}>
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-lg leading-none text-gray-800 dark:text-gray-500 font-medium">
                      {edge.field_timeline_date}
                    </time>
                    <p>{edge.field_timeline_details}</p>
                  </li>
                ))}
              </ol>
              <div className="font-medium	">Project Contact</div>
              {node.field_contacts.map((edge) => (
                <div className="mt-1" key={edge.id}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <p>{edge.field_contact_name}</p>
                      <p>{edge.field_contact_email}</p>
                      <p>{edge.field_contact_phone_number}</p>
                      <p>{edge.field_contact_title}</p>
                    </div>
                  </div>
                </div>
              ))}{" "}
              <div className="mt-6 font-medium	">Related Informaton</div>
              {node.field_related_information.map((item) =>
                item.type === "media--document" ? (
                  <p key={item.id}>
                    <a
                      href={
                        "https://is-drupal.dev.3sherpas.com/" +
                        item.field_media_document.uri.url
                      }
                      target="_blank"
                    >
                      {item.field_document_title}
                    </a>
                  </p>
                ) : (
                  <p key={item.id}>
                    <a
                      key={item.id}
                      href={item.field_media_entity_link.uri}
                      target="_blank"
                    >
                      {item.field_media_entity_link.title}
                    </a>
                  </p>
                )
              )}
            </div>
          </div>
        </div>
        <Gallery data={node.field_project_photos} />
      </div>
    </article>
  );
}
