import { DrupalClient } from "next-drupal";

const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;
const previewSecret = process.env.DRUPAL_PREVIEW_SECRET;

if (!baseUrl) {
  throw new Error(
    "NEXT_PUBLIC_DRUPAL_BASE_URL environment variable is not defined"
  );
}

if (!previewSecret) {
  throw new Error("DRUPAL_PREVIEW_SECRET environment variable is not defined");
}

export const drupal = new DrupalClient(baseUrl, {
  previewSecret: previewSecret,
});
