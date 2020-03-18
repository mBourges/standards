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
