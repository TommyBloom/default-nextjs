import { DrupalClient } from "next-drupal";
import fetch from "isomorphic-unfetch";

let drupalUrl: string = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!;

const customFetcher = (url: string) => {
  return fetch(url, {
    // Pass in additional options. Example: agent.
  })
    .then((response) => {
      // Handle successful response here.
      return response;
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch here.
      console.error("fetch error");
      console.error(error);
    });
};

// Pass the custom fetcher to the client.
export const drupal = new DrupalClient(drupalUrl, {
  fetcher: customFetcher,
});
