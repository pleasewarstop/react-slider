import type { NextConfig } from "next";
import path from "path";
import loaderUtils from "loader-utils";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    // @ts-expect-error need some time for fix
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
        "url-loader",
      ],
    });

    applyPrettyClassNames(config);

    return config;
  },
};

// @ts-expect-error need some time for fix
function applyPrettyClassNames(config) {
  const rules = config.module.rules
    // @ts-expect-error need some time for fix
    .find((rule) => typeof rule.oneOf === "object")
    // @ts-expect-error need some time for fix
    .oneOf.filter((rule) => Array.isArray(rule.use));

  // @ts-expect-error need some time for fix
  rules.forEach((rule) => {
    // @ts-expect-error need some time for fix
    rule.use.forEach((moduleLoader) => {
      if (
        moduleLoader.loader?.includes("css-loader") &&
        !moduleLoader.loader?.includes("postcss-loader")
      ) {
        if (moduleLoader.options.modules?.getLocalIdent) {
          moduleLoader.options.modules.getLocalIdent = folderIdent;
        }
      }
    });
  });
}

// @ts-expect-error need some time for fix
const folderIdent = (context, _: string, exportName: string) => {
  const resourcePath = context.resourcePath.replace(/\\+/g, "/");
  const folder = path.basename(path.dirname(resourcePath));

  const hash = loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, resourcePath)
          .replace(/\\+/g, "/")}#className:${exportName}`,
      ),
      "md4",
      "base64",
      5,
    )
    .replace(/[^a-zA-Z0-9-_]/g, "_")
    .replace(/^(-?\d|--)/, "_$1");

  return `${folder}__${exportName}__${hash}`;
};

export default nextConfig;
