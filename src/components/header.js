import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"


export default () => {
  const data = useStaticQuery(graphql`
    query NonPageQuery  {
      allSitePage(filter: {path: {glob: "/documentation/*"}}) {
        nodes {
          path
          fields { name }
        }
      }
    }
  `)

  const pages = data.allSitePage.nodes
    .map(node => {
      const { path, fields } = node;

      return (
        <Link className="navbar-item is-capitalized" to={path} key={path}>
          {fields.name}
        </Link>
      );
    });

   return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">


        <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link is-arrowless">Documentation</div>
            <div className="navbar-dropdown">{pages}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}