const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Blog posts retired in favour of the /learn guide (or newer post) that
  // now carries their content. Exact paths only, no wildcards.
  const retiredBlogPosts = [
    { source: '/blog/latex-lists-itemize-enumerate-description', destination: '/learn/lists', permanent: true },
    { source: '/blog/italic-text-latex-bold-underlining', destination: '/learn/bold-italics-underline', permanent: true },
    { source: '/blog/latex-matrices-2x2-3x3-4x4-determinants', destination: '/learn/matrices', permanent: true },
    { source: '/blog/integrals-sums-limits-latex-guide', destination: '/learn/integrals-sums-limits', permanent: true },
    { source: '/blog/omega-symbol-latex-greek-letters', destination: '/blog/omega-symbol-meaning-uses-math-science', permanent: true },
    { source: '/blog/latex-table-generator-create-tables-easily', destination: '/learn/tables', permanent: true },
    { source: '/blog/latex-table-spacing-row-column-separation', destination: '/learn/tables', permanent: true },
    { source: '/blog/overleaf-alternatives-research-writing-2025', destination: '/blog/overleaf-alternatives-research-writing-2026', permanent: true },
    { source: '/blog/latex-brackets-accolades-sizing-guide', destination: '/learn/brackets', permanent: true },
    { source: '/blog/latex-brackets-parentheses-printing-guide', destination: '/learn/brackets', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...retiredBlogPosts]

  return redirects
}

export default redirects
