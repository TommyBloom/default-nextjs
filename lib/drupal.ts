import { DrupalClient } from "next-drupal";
import fetch from "isomorphic-unfetch";

let drupalUrl: string = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!;

// Create a custom fetcher.
const customFetcher = (url: string) => {
  return fetch(url, {
    // Pass in additional options. Example: agent.
  });
};

// Pass the custom fetcher to the client.
export const drupal = new DrupalClient(drupalUrl, {
  fetcher: customFetcher,
});
