# InQool Frontend Interview Web App
Flexible web app that interacts with entities of given REST API.

<img src="/portfolio.png">

## Used Technologies
- **React**, **TypeScript**, **Vite** (project)
- **Bootstrap**, **CSS** (styles)
- **React TanStack Query**, **Axios** (API requests)
- **React Hook Form**, **Zod** (forms, validation)

## Features
### Add new entities with ease
Adding support for a new entity takes nothing more than adding a new page component with a few specifying constants filled up. Find example in existing page components **Users** and **Animals**. Specifying constants include:
- **ENDPOINT**
- **ENTITY_FIELDS**
- **FILTER_ATTRIBUTES**
- **IS_INDEXED_TABLE**
- **VALIDATION_SCHEMA** (using ZodSchema)
- **extraActionsOnSelected** as array of objects that define endpoint specific buttons to interact with selected row (can be left empty)

### When entity is specified
Pass all the necessary properties to the only child component **GenericEntity\<T\>**, T being the type of the new entity. System automatically generates:
- table filled up with data fetched from the connected REST API (link set up at apiRequests.ts), uses **ENTITY_FIELDS** as table schema and **IS_INDEXED_TABLE** to allow or disallow row indexes
  - click on a particular row to select it for future interaction
- sticky toolbar (all buttons use given **ENDPOINT** to interact with data)
  - forms for adding and editing objects generated based on **ENTITY_FIELDS** and **VALIDATION_SCHEMA**
  - forms for filtering data generated based on **FILTER_ATTRIBUTES**
  - extra buttons specific to the entity based on **extraActionsOnSelected**, allowing to define button style and label based on currently selected object, and also the action to provide with the object on pressing of the button
<div>System is prepared to handle addition of more entities, various schemas of entity fields, validation schemas, active filters and entity specific buttons with its flexible design, styles, dedicated scrollbars etc.</div>

## To run the app locally
- clone the repository
```
git clone https://github.com/JakubDurkac/inqool-react-project.git
```
- in the root directory, install the dependencies for a Node.js project using
```
npm install
```
- run development server
```
npm run dev
```
