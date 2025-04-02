declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js defaults
    NODE_ENV: "development" | "production" | "test";

    // Variables for fetching data from the CMS
    CMS_TYPE: string;
    CMS_URL: string;
    CMS_TOKEN: string;
  }
}
