/**
 * Product data
 */
const productData = require("./site-config/product-info")


/**
 * Sidebar navigation structure
 */
const sidebarNav = require("./site-config/sidebar-nav")

/**
 * Install methods route builder
 */
const releaseArray = require("./site-config/install-route-builder")

/**
 * Site Configuration
 */
module.exports = {
  title: productData.title,
  description: productData.description,
  host: "localhost",
  themeConfig: {
    twitter: productData.twitter,
    author: productData.author,
    repo: productData.repo,
    repoButtonLabel: productData.repoButtonLabel,
    cliNamespace: productData.cliNamespace,
    logo: productData.logo,
    slackInvite: productData.slackInviteURL,
    slackChannel: productData.slackChannelURL,
    docsDir: "docs",
    editLinks: false,
    search: true,
    searchMaxSuggestions: 10,
    algolia: {
      apiKey: "",
      indexName: ""
    },
    sidebar: sidebarNav,
    displayAllHeaders: true,
    nav: [
      { text: "Documentation", link: "/docs/" },
      { text: "Community", link: "/community/" },
      // { text: "Use Cases", link: "/use-cases/" },
      { text: "Request Demo", link: "/request-demo/" },
      { text: "Install", link: "/install/" }
    ]
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require("markdown-it-include"), "./docs/.partials/")
    }
  },
  plugins: {
    "clean-urls": {
      normalSuffix: "/",
      indexSuffix: "/"
    },
    sitemap: {
      hostname: productData.hostname
    },
    "@vuepress/google-analytics": {
      ga: productData.gaCode
    }
  },
  additionalPages: [
    releaseArray
  ],
  head: [
    // favicons
    [
      "link", {
        rel: "icon",
        href: "/images/favicon-64px.png"
      }
    ],
    // web fonts
    [
      "link", {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,500,700"
      }
    ],
    // Twitter
    [ "meta", { name: "twitter:card", content: "summary_large_image" } ],
    [ "meta", { name: "twitter:site", content: `@${productData.twitter}` } ],
    [ "meta", { name: "twitter:creator", content: `@${productData.twitter}` } ],
    [ "meta", { name: "twitter:title", content: `${productData.title} | ${productData.description}` } ],
    [ "meta", { name: "twitter:description", content: productData.description } ],
    [ "meta", { name: "twitter:image", content: '' } ], // @todo create an image for this
  ],
  serviceWorker: true,
  postcss: {
    plugins: [
      require("tailwindcss"),
      require("autoprefixer")({
        grid: true
      })
    ]
  },
  extraWatchFiles: [
    "/docs/.partials/*",
    "/site-config/product-info.js",
    "/site-config/sidebar-nav.js",
    "/public/install-methods.json",
    "/public/releases.json"
  ],
  evergreen: false,
  chainWebpack: (config, isServer) => {
    const jsRule = config.module.rule("js")
    jsRule
      .use("babel-loader")
      .loader("babel-loader")
      .options({
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage",
              corejs: 3,
              targets: {
                ie: 11,
                browsers: "last 2 versions"
              }
            }
          ]
        ]
      })
  }
};
