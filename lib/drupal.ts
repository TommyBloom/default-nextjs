import { DrupalClient } from "next-drupal";

const drupalURL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!;

// Create a custom fetcher using the Fetch API.
const customFetcher = (
  url: string,
  options: RequestInit & { withAuth?: boolean }
) => {
  const { withAuth, ...opts } = options;

  if (withAuth) {
    // Make additional requests to fetch a bearer token
    // Or any other Authorization headers.
  }

  return fetch(url, {
    ...opts,
    // Pass in additional options. Example: agent.
  });
};

// Pass the custom fetcher to the client.
export const drupal = new DrupalClient(drupalURL, {
  fetcher: customFetcher,
});
