import React from "react";
import Layout from "../../components/layout";
import CodeBlock from "../../components/codeBlock";

export default () => (
  <Layout>
    <h1 className="title is-1">Trigger Framework</h1>
    <CodeBlock label="TriggerHandler Interface" color="black">
{`public interface TriggerHandler
{
  Boolean isDisabled();
  void bulkBefore();
  void bulkAfter();
  void beforeInsert(SObject so);
  void beforeUpdate(SObject oldSo, SObject so);
  void beforeDelete(SObject so);
  void afterInsert(SObject so);
  void afterUpdate(SObject oldSo, SObject so);
  void afterDelete(SObject so);
  void finallyBefore();
  void finallyAfter();
}
`}
</CodeBlock>

<CodeBlock label="TriggerDispatcher" color="black">
{`public class TriggerDispatcher {
  public static void createAndExecuteHandler(Type t) {
    TriggerHandler handler = getHandler(t);

    if (handler == null) {
      throw new TriggerException('No Trigger Handler found named: ' + t.getName());
    }
    execute(handler);
  }

  private static void execute(TriggerHandler handler) {
    if (handler.isDisabled()) {
      return;
    }

    if (Trigger.isBefore) {
      handler.bulkBefore();

      if (Trigger.isDelete) {
        for (SObject so : Trigger.old) {
          handler.beforeDelete(so);
        }
      } else if (Trigger.isInsert) {
        for (SObject so : Trigger.new) {
          handler.beforeInsert(so);
        }
      } else if (Trigger.isUpdate) {
        for (SObject so : Trigger.old) {
          handler.beforeUpdate(so, Trigger.newMap.get(so.Id));
        }
      }

      handler.finallyBefore();
    } else {
      handler.bulkAfter();

      if (Trigger.isDelete) {
        for (SObject so : Trigger.old) {
          handler.afterDelete(so);
        }
      } else if (Trigger.isInsert) {
        for (SObject so : Trigger.new) {
          handler.afterInsert(so);
        }
      } else if (Trigger.isUpdate) {
        for (SObject so : Trigger.old) {
          handler.afterUpdate(so, Trigger.newMap.get(so.Id));
        }
      }
    }

    handler.finallyAfter();
  }

  private static TriggerHandler getHandler(Type t) {
    Object o = t.newInstance();

    if (!(o instanceOf TriggerHandler)) {
      return null;
    }

    return (TriggerHandler)o;
  }

  public class TriggerException extends Exception {}
}`}
</CodeBlock>

<CodeBlock label="TriggerDispatcher" color="black">
{`public with sharing class ExpenseReportTriggerHandler implements TriggerHandler {
  public ExpenseReportTriggerHandler() {}

  // You can setup a settings or static variable to disable the trigger
  public Boolean isDisabled() {
    return false;
  }

  public void bulkBefore(){}
  public void bulkAfter() {}

  public void beforeInsert(SObject so){
    ExpenseReport__c expenseReport = (ExpenseReport__c)so;

    expenseReport.Status__c = 'Draft';
  }

  public void beforeUpdate(SObject oldSo, SObject so) {}
  public void beforeDelete(SObject so) {}
  public void afterInsert(SObject so) {}
  public void afterUpdate(SObject oldSo, SObject so) {}
  public void afterDelete(SObject so) {}
  public void finallyBefore() {}
  public void finallyAfter() {}
}`}
</CodeBlock>

<CodeBlock label="TriggerDispatcher" color="black">
{`trigger ExpenseReportTrigger on ExpenseReport__c (
  before insert,
  before update,
  before delete,
  after insert,
  after update,
  after delete,
  after undelete
) {
  TriggerDispatcher.createAndExecuteHandler(ExpenseReportTriggerHandler.class);
}`}
</CodeBlock>

  </Layout>
);
