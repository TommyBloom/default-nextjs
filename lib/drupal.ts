import { DrupalClient } from "next-drupal";

let drupalUrl: string = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL!;

export const drupal = new DrupalClient(drupalUrl, {
  previewSecret: process.env.DRUPAL_PREVIEW_SECRET,
});
