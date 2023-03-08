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
  })
    .then((response) => {
      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .catch((error) => {
      // Handle the error
      console.error("Error making request:", error);
      throw error;
    });
};

// Pass the custom fetcher to the client.
export const drupal = new DrupalClient(drupalURL, {
  fetcher: customFetcher,
});
