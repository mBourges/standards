import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default ({ children, label, color, language = 'java' }) => {
  const colorClass = `has-text-${color} has-text-weight-bold`;
  const title = label && (<div className={colorClass}>{label}</div>);

  return (
    <div className="content code">
      {title}
      <SyntaxHighlighter style={ghcolors} language={language}>
        {children}
      </SyntaxHighlighter>
    </div>
  )
};
