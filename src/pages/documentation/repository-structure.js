import React from "react";
import Layout from "../../components/layout";
import CodeBlock from "../../components/codeBlock";

export default () => (
  <Layout>
    <h1 className="title is-1">Git Repository Structure</h1>
    <p>A git repository should be build using the following structure:</p>
    <ul>
      <li>Master branch: production ready source</li>
      <li>Develop branch: stable code pending release</li>
      <li>Feature branches: new feature code</li>
      <li>Release branches: next release code, allows for last minutes fix</li>
      <li>Hotfix branches: unplanned production maintenance code</li>
    </ul>

    <h2 className="title is-2">Feature branches</h2>
    <p>Branch off from: develop</p>
    <p>Merge back into: develop</p>
    <p>Branch naming convention: feature-*</p>
    <CodeBlock label="Create a feature branch" language="shell">
      {`$ git checkout -b feature-sfdc1986 develop`}
    </CodeBlock>
    <p>Incorporate a finished feature on develop</p>
    <p>Use Github Pull Request creation page.</p>

    <h2 className="title is-2">Release branches</h2>
    <p>Managed by Release Manager</p>
    <p>Branch off from: develop</p>
    <p>Merge back into: develop and master</p>
    <p>Branch naming convention: release-&lt;VERSION_NUMBER&gt;</p>
    <CodeBlock label="Create a release branch" language="shell">
{`$ git checkout -b release-1.2 develop
# bump the package number
$ git commit -a -m "maint: bump version number to 1.2"`}
    </CodeBlock>
    <p>Finishing a release branch</p>
    <CodeBlock label="Merge into Master" language="shell">
{`$ git checkout master
$ git merge --no-ff release-1.2
$ git tag -a 1.2`}
    </CodeBlock>
    <CodeBlock label="Merge into Develop" language="shell">
{`$ git checkout develop
$ git merge --no-ff release-1.2
$ git branch -d release-1.2`}
    </CodeBlock>

    <h2 className="title is-2">Hotfix branches</h2>
    <p>Merge back is managed by release manager</p>
    <p>May branch off from: master</p>
    <p>Must merge back into: develop and master</p>
    <p>Branch naming convention: hotfix-&lt;VERSION_NUMBER&gt;</p>
    <CodeBlock label="Creating a hotfix branch" language="shell">
{`$ git checkout -b hotfix-1.2.1 master
# bump package version number
$ git commit -a -m "maint: bump version number to 1.2.1"`}
    </CodeBlock>
    <p>Finishing a hotfix branch</p>
    <CodeBlock label="Merge back to Master" language="shell">
{`$ git checkout master
$ git merge --no-ff hotfix-1.2.1
$ git tag -a 1.2.1`}
      </CodeBlock>
      <CodeBlock label="Merge back to Develop" language="shell">
{`$ git checkout develop
$ git merge --no-ff hotfix-1.2.1`}
      </CodeBlock>
      <CodeBlock label="Delete the release brach" language="shell">
        {`$ git branch -d hotfix-1.2.1`}
      </CodeBlock>
      <p>Source (if you want to read the full article): <a href="https://nvie.com/posts/a-successful-git-branching-model/" rel="noopener noreferrer" target="_blank">https://nvie.com/posts/a-successful-git-branching-model/</a></p>
  </Layout>
);