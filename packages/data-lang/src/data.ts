import { CalculatorPure } from "./parser";

// wrapping it all together
// reuse the same parser instance.
const parser = new CalculatorPure([]);

// ----------------- Interpreter -----------------
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

class CalculatorInterpreter extends BaseCstVisitor {
  constructor() {
    super();
    // This helper will detect any missing or redundant methods on this visitor
    this.validateVisitor();
  }

  expression(ctx) {
    return this.visit(ctx.workflowExpression);
  }

  workflowExpression(ctx) {
    let result = this.visit(ctx.workflowExpression);
  }

  domainExpression(ctx) {
    let result = this.visit(ctx.domainExpression);
  }

  returnExpression(ctx) {
    let result = this.visit(ctx.returnExpression);
  }

  subProcessExpression(ctx) {
    let result = this.visit(ctx.subProcess);
  }

  subProcessBodyExpression(ctx) {
    let result = this.visit(ctx.subProcessBody);
  }

  identifiersExpression(ctx) {
    let result = this.visit(ctx.ids);
  }

  multipleIdentifiersExpression(ctx) {
    let result = this.visit(ctx.ids);
  }

  nestedIdentifierExpression(ctx) {
    let result = this.visit(ctx.ids);
  }

  loopExpression(ctx) {
    let result = this.visit(ctx.loop);
  }

  processBodyExpression(ctx) {
    let result = this.visit(ctx.processBody);
  }

  processBodyLinesExpression(ctx) {
    let result = this.visit(ctx.processBodyLines);
  }

  processBodyLineExpression(ctx) {
    let result = this.visit(ctx.processBodyLine);
  }

  validateExpression(ctx) {
    let result = this.visit(ctx.validate);
  }

  substepExpression(ctx) {
    let result = this.visit(ctx.substep);
  }

  substepBodyExpression(ctx) {
    let result = this.visit(ctx.substepBody);
  }

  inputExpression(ctx) {
    let result = this.visit(ctx.input);
  }

  outputExpression(ctx) {
    let result = this.visit(ctx.output);
  }

  dependenciesExpression(ctx) {
    let result = this.visit(ctx.dependencies);
  }

  boundedContextExpression(ctx) {
    let result = this.visit(ctx.context);
  }

  eventsExpression(ctx) {
    let result = this.visit(ctx.events);
  }

  successExpression(ctx) {
    let result = this.visit(ctx.success);
  }

  errorExpression(ctx) {
    let result = this.visit(ctx.error);
  }

  dataExpression(ctx) {
    let result = this.visit(ctx.data);
  }

  dataBodyExpression(ctx) {
    let result = this.visit(ctx.body);
  }

  andDataBodyExpression(ctx) {
    let result = this.visit(ctx.and);
  }

  withStringExpression(ctx) {
    let result = this.visit(ctx.with);
  }

  orDataBodyExpression(ctx) {
    let result = this.visit(ctx.or);
  }

  moreDataBodyExpression(ctx) {
    let result = this.visit(ctx.more);
  }

  dataIdentityExpression(ctx) {
    let result = this.visit(ctx.id);
  }

  dataConstraintExpression(ctx) {
    let result = this.visit(ctx.constraint);
  }

  integerBetweenExpression(ctx) {
    let result = this.visit(ctx.int);
  }

  decimalBetweenExpression(ctx) {
    let result = this.visit(ctx.int);
  }

  integerConstraintExpression(ctx) {
    let result = this.visit(ctx.int);
  }

  decimalConstraintExpression(ctx) {
    let result = this.visit(ctx.decimal);
  }

  positionExpression(ctx) {
    let result = this.visit(ctx.pos);
  }

  stringConstraintExpression(ctx) {
    let result = this.visit(ctx.if);
  }

  stringThenConstraintExpression(ctx) {
    let result = this.visit(ctx.then);
  }

  stringOptThenExpression(ctx) {
    let result = this.visit(ctx.optThen);
  }

  stringThenDigitsExpression(ctx) {
    let result = this.visit(ctx.digits);
  }

  workflowBodyExpression(ctx) {
    let result = this.visit(ctx.body);
  }

  triggerExpression(ctx) {
    let result = this.visit(ctx.trigger);
  }

  sendExpression(ctx) {
    let result = this.visit(ctx.send);
  }

  effectsExpression(ctx) {
    let result = this.visit(ctx.effects);
  }

  inputsExpression(ctx) {
    let result = this.visit(ctx.inputs);
  }

  outputsExpression(ctx) {
    let result = this.visit(ctx.outputs);
  }

  eventExpression(ctx) {
    let result = this.visit(ctx.event);
  }

  processExpression(ctx) {
    let result = this.visit(ctx.process);
  }

  ifThenElseExpression(ctx) {
    let result = this.visit(ctx.if);
  }

  thenExpression(ctx) {
    let result = this.visit(ctx.then);
  }

  elseExpression(ctx) {
    let result = this.visit(ctx.else);
  }

  elseBodyExpression(ctx) {
    let result = this.visit(ctx.elseBody);
  }

  doStepsExpression(ctx) {
    let result = this.visit(ctx.doSteps);
  }

  doStepExpression(ctx) {
    let result = this.visit(ctx.doStep);
  }

  stopExpression(ctx) {
    let result = this.visit(ctx.stop);
  }

  actionExpression(ctx) {
    let result = this.visit(ctx.action);
  }

  actionLineExpression(ctx) {
    let result = this.visit(ctx.actionLine);
  }

  action(ctx) {
    let result = this.visit(ctx.act);
  }

  toAction(ctx) {
    let result = this.visit(ctx.action);
  }

  actToExpression(ctx) {
    let result = this.visit(ctx.actTo);
  }

  inAction(ctx) {
    let result = this.visit(ctx.action);
  }

  actInExpression(ctx) {
    let result = this.visit(ctx.actIn);
  }

  fromAction(ctx) {
    let result = this.visit(ctx.action);
  }

  actFromExpression(ctx) {
    let result = this.visit(ctx.actFrom);
  }

  toExpression(ctx) {
    let result = this.visit(ctx.to);
  }

  inExpression(ctx) {
    let result = this.visit(ctx.in);
  }

  fromExpression(ctx) {
    let result = this.visit(ctx.from);
  }

  doBodyExpression(ctx) {
    let result = this.visit(ctx.doBody);
  }

  validExpression(ctx) {
    let result = this.visit(ctx.valid);
  }

  conditionalExpression(ctx) {
    let result = this.visit(ctx.condition);
  }

  primaryExpression(ctx) {
    let result = this.visit(ctx.primary);
  }

  otherExpression(ctx) {
    let result = this.visit(ctx.other);
  }

  numberTypeExpression(ctx) {
    let result = this.visit(ctx.numberType);
  }

  stringTypeExpression(ctx) {
    let result = this.visit(ctx.stringType);
  }

  dataAndTypeExpressions(ctx) {
    let result = this.visit(ctx.dataType);
  }
}

// for the playground to work the returned object must contain these fields
return {
  lexer: CalculatorLexer,
  parser: CalculatorPure,
  visitor: CalculatorInterpreter,
  defaultRule: "expression"
};
