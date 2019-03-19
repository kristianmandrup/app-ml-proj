# Application Model Language (AppML)

Application Model Language can be used to write the domain model and processing workflows for an application. This declarative specification can then use to generate skeleton application code and various artifacts for whatever combination of:

- platforms
- languages
- frameworks
- libraries

"One ring to rule them all"

The AppML is based on the language used in the book: [Domain Modelling made Functional]()

## Lerna project

This is a mono-repo [lerna](https://lernajs.io/) project consisting of individual, focues packages.

## Repo design

### app-ml-chevrotain

The complete AppML language, implemented in chevrotain:

- lexer
- parser
- CST (Concrete Syntax Tree)

The chevrotain implementation will use the chevrotain helper APIs:

- chevrotain-lexx
- chevrotain-parsx

These libraries provide for a cleaner, more safe expression of the language grammar.
They will also be designed for a more composable language, so it can be split into
parts and tested individually and then assembled into a complete language.

To achieve this, each language part must be able to be merged with other parts.
This goes for both the lexer, parser and CST.

## app-ml-lang

The full AppML language, composed from its various sub packages.
See language part packages:

- data-lang
- workflow-lang
- process-lang

Each of the language parts should be implemented independently and composed as needed from other parts.
This makes is much easier to implement a large language.

```aml
context: "Order taking"

data Order =
  CustomerInfo
  AND ShippingAddress

  ...

Workflow:
  ...

  process:
    ...
```

### data-lang

The data part of the AppML language. The top level expression is `data`.

```aml
context: "Order taking"

data Order =
  CustomerInfo
  AND ShippingAddress

data Order_Quantity = UnitQuantity OR KilogramQuantity
data UnitQuantity = number between 1 and 10
data KilogramQuantity = decimal between 2.02 and 2.3

data WidgetCode = string starting with "W" then 4 digits
data ProductCode = string ending with "P" then 2 digits

data MyProductCode = text

data UnvalidatedOrder =
  UnvalidatedCustomerInfo
  AND UnvalidatedShippingAddress
  AND UnvalidatedBillingAddress
  AND list of UnvalidatedOrderLine

data UnvalidatedOrderLine =
  UnvalidatedProductCode
  AND UnvalidatedOrderQuantity
```

### workflow-lang

The workflow part of the AppML language. The top level expression is `workflow`.

```aml
Workflow: "Place order"
  trigger: "Order form received"
  inputs:
    primary: "An order form"
    other: "Product catalog"
    other: "Inventory"
  outputs:
    success:
      OrderAcknowledgementSent
      AND OrderPlaced
      AND BillableOrderPlaced
    error:
      InvalidOrder
  effects:
    send: "Acknowledgement to customer"

  process: TODO
```

### process-lang

The workflow process part of the AppML language. The top level expression is a process.
The workflow lang part should be composed in part from this language part.

```aml
  process:
    do ValidateOrder
      if order is invalid then
        add InvalidOrder
    do ProcessOrder
    do SendAcknowledgementToCustomer
    do OrderPlaced

 substep ValidateOrder =
   input: UnvalidatedOrder
   output: ValidatedOrder OR ValidationError
   dependencies: CheckProductCodeExists, CheckAdressExists

   process:
     validate customer name
     check shipping and billing address exists
     for each line:
       check product code syntax
       check product code exists in ProductCatalog

     if ok then
       return ValidatedOrder
     else
       return ValidationError

substep PriceOrder =
  input: ValidatedOrder
  output: PricedOrder
  dependencies: GetProductPrice

  process:
    for each line:
      get price of product
      set price of line

substep SendAcknowledgeMentToCustomer =
  input: PriceOrder
  output: None
  dependencies: None

  process:
    create acknowledgement letter
    send acknowledgement letter and priced order to customer
```

### chevrotain-lexx

Chevrotain Lexer API to make it more efficient and safe to express the lexer.
The `Lexx` class must be composable so that multiple `Lexx` instances can be merged into a composite `Lexx` instance.

### chevrotain-parsx

Chevrotain PArser API to make it more efficient and safe to express the parser.
The `Parsx` class must be composable so that multiple `Lexx` instances can be merged into a composite `Parsx` instance. It must also encapsulate certain common patterns and expose a more fluid, intuitive builder API.
