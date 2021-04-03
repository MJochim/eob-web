require("dotenv").config({ path: ".env.local" });
const { generate } = require("@graphql-codegen/cli");

async function run() {
  await generate(
    {
      schema: "./src/graphql/typeDefs.graphql",
      documents: "src/components/**/*.local.graphql",
      generates: {
        [process.cwd() + "/src/generated/local.tsx"]: {
          plugins: ["typescript"],
        },
        ["src/"]: {
          preset: "near-operation-file",
          presetConfig: {
            extension: ".generated.ts",
            baseTypesPath: "/generated/local.tsx",
          },
          plugins: [
            "typescript",
            "typescript-operations",
            "typed-document-node",
          ],
        },
        [process.cwd() + "/src/graphql.schema.json"]: {
          plugins: ["introspection"],
        },
      },
    },
    true
  );

  await generate(
    {
      schema: {
        [`https://api-eu-central-1.graphcms.com/v2/${process.env.GQL_CMS_ID}/master`]: {
          headers: {
            Authorization: `Bearer ${process.env.GQL_CMS_TOKEN}`,
          },
        },
      },
      documents: "src/**/*.cms.graphql",
      generates: {
        [process.cwd() + "/src/generated/graphql.tsx"]: {
          plugins: ["typescript"],
        },
        ["src/"]: {
          preset: "near-operation-file",
          presetConfig: {
            extension: ".generated.ts",
            baseTypesPath: "/generated/graphql.tsx",
          },
          plugins: ["typescript-operations", "typed-document-node"],
        },
        [process.cwd() + "/src/graphql.schema.json"]: {
          plugins: ["introspection"],
        },
      },
    },
    true
  );
  await generate(
    {
      schema: "./src/graphql/typeDefs.graphql",
      // documents: "src/components/**/*.graphql",
      generates: {
        [process.cwd() + "/src/generated/resolvers-types.ts"]: {
          plugins: ["typescript", "typescript-resolvers"],
        },
      },
    },
    true
  );
}

run();
