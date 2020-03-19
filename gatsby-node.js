const DOCUMENTATION_FOLDER = '/documentation/';

function isDocumentationPage(node) {
  const { internal, path } = node;

  return internal.type === 'SitePage'
    && path.startsWith(DOCUMENTATION_FOLDER);
}

function formatDocumentationPageName(path) {
  return path.substring(DOCUMENTATION_FOLDER.length, path.length - 1)
    .replace(/\-/gi, ' ');
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (isDocumentationPage(node)) {
    createNodeField({
      node,
      name: 'name',
      value: formatDocumentationPageName(node.path)
    })
  }
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*";
    createPage(page)
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    // Exclude Sign-In Widget from compilation path
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /okta-sign-in/,
            use: loaders.null(),
          }
        ],
      },
    })
  }
};
