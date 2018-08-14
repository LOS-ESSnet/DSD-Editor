# DSD-Editor

Prototype tool for editing W3C Data Cube DSDs

## Getting started

DSD-Editor is a single page application built with [React](https://facebook.github.io/react/). It was bootstraped with [Create React App](https://github.com/facebook/create-react-app) and designed thanks to [Bootstrap](https://github.com/twbs/bootstrap). To run the application in development mode, run the following commands from a shell prompt in the local directory, and then navigate to [http://localhost:3000](http://localhost:3000):

```
# Download all the dependencies needed by the application
yarn install
# Compiles the code and starts a minimal web server
yarn start
```

## W3C Data Cube DSDs Model

!["DSDs Model"](./docs/img/qb.png)

## DSD-Editor Model

### DSD

| Attribute              | Predicat           | Type                         |
| ---------------------- | ------------------ | ---------------------------- |
|                        | rdf:type           | qb:DataStructureDefinition   |
| Identifier             | dcterms:identifier | xsd:string                   |
| Label                  | rdfs:label         | xsd:string (typed by lang)   |
| Description            | dc:description     | xsd:string (typed by lang)   |
| ComponentSpecification | qb:Component       | URI (ComponentSpecification) |

### Component Specification

| Attribute   | Predicat                                                                                | Type                                                                                            |
| ----------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
|             | rdf:type                                                                                | qb:ComponentSpecification                                                                       |
| Property    | [qb:ComponentProperty](https://www.w3.org/TR/vocab-data-cube/#ref_qb_ComponentProperty) | URI (ComponentProperty)                                                                         |
| Attachement | qb:componentAttachement                                                                 | URI ([componentAttachement](https://www.w3.org/TR/vocab-data-cube/#ref_qb_componentAttachment)) |

### Component Property

| Attribute  | Predicat           | Type                         |
| ---------- | ------------------ | ---------------------------- |
|            | rdf:type           | qb:{type}Property            |
| Identifier | dcterms:identifier | xsd:string                   |
| Label      | rdfs:label         | xsd:string (typed by lang)   |
| Concept    | qb:concept         | URI                          |
| Range      | rdfs:range         | xsd type or URI              |
| CodeList   | qb:codeList        | URI (ComponentSpecification) |

{type} can only be one of : _Attribute, Dimension, Measure or Coded_  
A Component Property can also combine types.

### Linkable Concepts

| Attribute | Predicat                    | Type                       |
| --------- | --------------------------- | -------------------------- |
|           | rdf:type                    | skos:Concept               |
| Label     | rdfs:label / skos:prefLabel | xsd:string (typed by lang) |

### Linkable CodeList

| Attribute | Predicat       | Type                       |
| --------- | -------------- | -------------------------- |
|           | rdf:type       | sdmx:CodeList              |
| Label     | skos:prefLabel | xsd:string (typed by lang) |
