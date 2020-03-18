import React from "react";
import { Link } from 'gatsby';
import Layout from "../../components/layout";
import CodeBlock from "../../components/codeBlock";

export default () => (
  <Layout>
    <a href="#introduction" className="button is-link is-outlined action-button">&#708; top</a>
    <div className="container has-top-margin">
      <div className="columns">
        <div className="column">
          <aside className="menu">
            <p className="menu-label">
              Coding Standard
            </p>
            <ul className="menu-list">
              <li><a href="#introduction">Introduction</a></li>
              <li>
                <a href="#common">Common rules to any language</a>
                <ul>
                  <li><a href="#naming">Naming</a></li>
                  <li><a href="#comments">Comments &amp; Dead code</a></li>
                  <li><a href="#structure">Structure</a></li>
                  <li><a href="#space">Space</a></li>
                  <li><a href="#if-conditions">If conditions</a></li>
                  <li><a href="#brackets">Brackets</a></li>
                </ul>
              </li>
              <li>
                <a href="#apex">Apex</a>
                <ul>
                  <li><a href="#soql–query">SOQL – Query</a></li>
                  <li><a href="#soql–handle-results">SOQL – Handle Results</a></li>
                  <li><a href="#dml">DML</a></li>
                  <li><a href="#trigger-framework">Trigger Framework</a></li>
                </ul>
              </li>
              <li><a href="#conclusion">Conclusion</a></li>
            </ul>
          </aside>
        </div>
        <div className="column is-four-fifths">
          <h2 className="title is-2"><span name="introduction">Introduction</span></h2>
          <p>
            The purpose of this document is to define some common rules in order to create a clean and easy to read project. Because the standards are agreed by everyone, they should be strictly respected to maintain a high level of code quality.
            The most important principle to keep in mind is that we are @author. We create code. We are responsible and accountable for this code. We should be proud of this code.
          </p>
          <p>
            Another important thing to remember is that we are a team. Your code is shared with everyone. Your code should be readable and understandable by everyone, even by the future you, trying to fix a bug 6 months later.
          </p>
          <p>
            Finally, a last rule to follow is the Boy Scout rule: “Always leave the campground cleaner than you found it”. Every time you read some code, if any line seems to be unclear, abstract, dirty or anything else not respecting this document, it is also your responsibility to clean it and to improve this code (you are, of course, allowed to blame and slap the author). Afraid to break anything doing this? That’s why unit tests are made.
          </p>

          <h2 className="title is-2">Common rules to any language</h2>

          <h3 className="title is-3">Naming</h3>
          <p>
            A method says what it does and does what it says. Use long name variables, no abbreviations, even for temp variables.
          </p>
          <p>
            only one exception is for “for” variables, where i, j or k are allowed. Use CamelCase, all classes starting with an upper case, methods and variables with lower case
          </p>

          <CodeBlock label="Bad" color="danger">
{`if(app.Issue__r.size() > 0) {
··Boolean tmp = true;
··com.closeDate = app.Issue__r[0].Close_Date__c;
··com.status = 'New';
··myClass Local_class = new myClass();

··Local_class.DoSomething();

··return Local_class.MyField;
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`if (application.Issue__r.size() > 0) {
··Boolean issueHasManyComment = true;
··comment.closeDate = application. Issue__r.get(0).Close_Date__c;
··comment.status = 'New';
··MyClass localClass = new MyClass();

··localClass.doSomething();

··return localClass.myField;
}`}
          </CodeBlock>
          <CodeBlock label="Exception: counter used in for loop can be i,j &amp; k." color="black">
{`for (int i = 0; i > maxSize; i++) {}`}
          </CodeBlock>

          <h3 className="title is-3">Comments &amp; Dead code</h3>
          <p>Comments should be only used in last solution. Use explicit methods instead. Avoid commented code.</p>
          <p>Version control tools or Eclipse local history are there if you need to get back your old commented code.</p>
          <CodeBlock label="Bad" color="danger">
{`// checks if Retainer-Type Job Order only has 1 active placement and loads job order fees
if(Account.RecordType.DeveloperName == 'Partner') isPartner = true;
if(isPartner) this.loadPartnerFees(productIds);`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`this.loadPartnerFeesIfNeeded(productIds);

private void loadPartnerFeesIfNeeded(List<Id> productIds) {
··if (jobOrder.RecordType.DeveloperName == 'Partner') {
····this.isPartner = true;
····this.loadPartnerFees(productIds);
··}
}`}
          </CodeBlock>
          <p>Dead code is code that has been commented while implementing a new feature or refactoring an old one. Remove it from the commit. </p>
          <p>Your favorite VCS (git for instance) allow you to review your past code.</p>
          <CodeBlock label="Bad" color="danger">
{`$scope.openLink = function(link) {
··$scope.selectedLinkId = link; $scope.showForm = true;
··// document.getElementById('pplIframe').contentWindow.location.reload();
}`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger">
{`if (account.Status == 'New') {
··account.isPartner = true;
··// partner = MyClass.getPartner(account);
··// partner.count += 1;
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`if (account.Status == 'New') {
··account.isPartner = true;
}`}
          </CodeBlock>

          <h3 className="title is-3">Structure</h3>
          <p>Use a 2 spaces for each level. Open bracket on same line. Close bracket on the same level.</p>
          <p>Use only one return;</p>
          <CodeBlock label="Good" color="success">
{`public with sharing class Ats3PipelineBuilder {
··private Id jobOrderId;

··public void build(Id jobOrderId) {
····this.atsPipelineDto = new Ats3PipelineDto();
····if (jobOrder.ts2__Applications__r.size() == 0) {
······this.messages.add(new Ats3MessageDto('error', 'noApplication'));
····} else {
······this.jobOrderName = jobOrder.Name;
····}
··}
}`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger">
{`private List&lt;ts2__Offer__c&gt; myFunction() {
····if (this.Condition())
····{
········return new List<ts2__Offer__c>();
····}
···· else {
········return null;
····}
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`private List<ts2__Offer__c> myFunction() {
··List<ts2__Offer__c> objectToReturn;

··if (this.Condition()) {
····objectToReturn = new List<ts2__Offer__c>();
··}

··return objectToReturn;
}`}
          </CodeBlock>

          <h3 className="title is-3">Space</h3>
          <p>Put space between parenthesis and brackets, in for loops and in logical conditions.</p>
          <CodeBlock label="Bad" color="danger">
{`private void processOffers(List<ts2__Offer__c> offers){
··for(ts2__Offer__c offer:offers){
····if(offer.ts2__Candidate__c==null){`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`private void processOffers(List<ts2__Offer__c> offers) {
··for (ts2__Offer__c offer : offers) {
····if (offer.ts2__Candidate__c == null) {`}
          </CodeBlock>

          <h3 className="title is-3">If conditions</h3>
          <p>
            If you have two or more logical conditions in an if, use an explicit private method. If your if condition returns a Boolean, inline it. Don’t chain many useless levels of if conditions. One space after if condition and before opening bracket.
          </p>
          <CodeBlock label="Bad" color="danger">
{`if (offer.ts2__Candidate__c == null && this.number > 10 && (this.toto != null || !tata)) {
··// DO STUFF
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`if (shouldDoStuff()) {
··// DO STUFF
}

private boolean shouldDoStuff() {
··return offer.ts2__Candidate__c == null
····&& this.number > 10 </p>
····&& (
······this.toto != null
······|| ! tata
····);
}`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger">
{`if(pars.stages && pars.stages.length > 0 && pars.stages.indexOf(item.stage) != -1) {
··return true;
}

return false;`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`return (
··pars.stages
··&& pars.stages.length > 0
··&& pars.stages.indexOf(item.stage) != -1</p>
);`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger">
{`if (items[i].cddOwnerId == pars.selectedUserId) {
  if(stageCheck(pars, items[i])) arrayToReturn.push(items[i]);
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`if (items[i].cddOwnerId == pars.selectedUserId && stageCheck(pars, items[i])) {
··arrayToReturn.push(items[i]);
}`}
          </CodeBlock>
          <CodeBlock label="Better" color="success" language="javascript">
{`if (this.shouldPushData(parser, items[i])) {
··arrayToReturn.push(items[i]);
}

this.shouldPushData = function(parser, item) {
··return item.cddOwnerId == parser.selectedUserId
····&& stageCheck(parser, item);
}`}
          </CodeBlock>
          <h3 className="title is-3">Brackets</h3>
          <p>Use brackets every time, even for one line if or for loop. One line if or for loop are bugs magnets.</p>
          <CodeBlock label="DO NOT DO THIS!" color="danger">
{`for(ts2__Application__c app : j.ts2__Applications__r)
··(app.ts2__Candidate_Contact__c);
for(ts2__Submittal__c sub : j.ts2__Presents__r)
··ids.add(sub.ts2__Candidate__c);
for(ts2__Interview__c ccm : j.ts2__Interviews__r)
··ids.add(ccm.ts2__Candidate__c);
for(ts2__Offer__c off : j.ts2__Offers__r)
··ids.add(off.ts2__Candidate__c);
for(ts2__Placement__c plc : j.ts2__Placements__r)
··ids.add(plc.ts2__Employee__c);`}
          </CodeBlock>
          <CodeBlock label="I WILL KILL YOUR DOG IF YOU DO THIS" color="danger">
{`if(jobOrder.RecordType.DeveloperName == 'Retainer') isRetainer = true;
if(isRetainer) this.loadRetainerFees(jobOrder);`}
          </CodeBlock>
          <CodeBlock label="OR THIS" color="danger">
{`for(var i=0;i>items.length; i++)if(stageCheck(pars,items[i]))arrayToReturn.push(items[i]);`}
          </CodeBlock>

          <h2 className="title is-2">Apex</h2>
          <h3 className="title is-3">SOQL – Query</h3>
          <p>
            Write SOQL queries on several lines. If the number of selected fields and where conditions is high, separate each field and conditions on its own line. Small queries (&gt;5 fields, 1 condition) can be on one line.
          </p>
          <CodeBlock label="Bad" color="danger" language="sql">
{`List<ts2__Placement__c> fees = [Select Id, Name, Retainer_Fee_Type__c From ts2__Placement__c Where Retainer_Parent__c = :retainerPlacement.Id]`}
          </CodeBlock>
          <CodeBlock label="Good" color="success" language="sql">
{`List<ts2__Placement__c> fees = [
··Select Id, Name, Retainer_Fee_Type__c
··From ts2__Placement__c
··Where Retainer_Parent__c = :retainerPlacement.Id
]`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger" language="sql">
{`List<ts2__Placement__c> fees = [Select Id, Name, RecruiterName__c, Closed_Date__c, Billable_Salary__c, Billable_Bonus__c, ..., Retainer_Fee_Type__c From ts2__Placement__c Where Retainer_Parent__c = :retainerPlacement.Id AND Billable_Bonus__c > 3000 AND Closed_Date__c = TODAY]`}
          </CodeBlock>
          <CodeBlock label="Good" color="success" language="sql">
{`List<ts2__Placement__c> fees = [
··Select
····Id,
····Name,
····RecruiterName__c,
····Closed_Date__c,
····Billable_Salary__c,
····Billable_Bonus__c,
····...,
····Retainer_Fee_Type__c
··From ts2__Placement__c
··Where
····Retainer_Parent__c = :retainerPlacement.Id
····And Billable_Bonus__c > 3000
····And Closed_Date__c = TODAY
]`}
          </CodeBlock>
          <CodeBlock label="OK (short query)od" color="black" language="sql">
{`Account account = [Select Id, Name From Account Where Id = :id]`}
          </CodeBlock>

          <h3 className="title is-3">SOQL – Handle Results</h3>
          <p>
            If your SOQL query returns a collection and you need to loop on it, insert it in a double for loop to avoid APEX limitations.
          </p>
          <CodeBlock label="Bad" color="danger">
{`List<RecordType> rtypes = [
··Select Name, Id
··From RecordType
··where
····sObjectType = 'ts2__Placement__c'
····and isActive = true
];

Map<String,Id> placementRecordTypes = new Map<String,Id>();

for (RecordType rt: rtypes) {
  placementRecordTypes.put(rt.Name, rt.Id);
}`}
          </CodeBlock>
          <CodeBlock label="Good" color="success">
{`for (List<ts2__Placement__c> fees : [
··Select Id, Name, Retainer_Fee_Type__c
··From ts2__Placement__c
··Where Retainer_Parent__c = :retainerPlacement.Id
]) {
··for (ts2__Placement__c fee: fees) {
····//ANY CODE
··}
}`}
          </CodeBlock>

          <h3 className="title is-3">DML</h3>
          <p>Make sure your code is bulkily and avoid DML inside any for loop.</p>
          <CodeBlock label="Bad" color="danger">
{`for (RecordType rt: rtypes) {
··update rt;
}`}
          </CodeBlock>
          <CodeBlock label="Bad" color="danger">
{`List<RecordType> listToUpdate = new List<RecordType>();

for (RecordType rt: rtypes) {
··listToUpdate.add(rt);
}

update listToUpdate;`}
          </CodeBlock>

          <h2 className="title is-2">Trigger Framework</h2>
          <p>A trigger handler framework is a way to remove logic from your triggers and enforce consistency across the platform.</p>
          <p>Check this page: <Link to="/documentation/trigger-framework">Trigger framework</Link></p>

          <h2 className="title is-2"><span name="conclusion">Conclusion</span></h2>
          <div className="has-text-centered">
            <img src="/images/coding-standard-conclusion.png" alt="Coding Standards Conclusion" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);