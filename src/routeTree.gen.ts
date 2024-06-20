/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TasksImport } from './routes/tasks'
import { Route as FormImport } from './routes/form'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TasksRoute = TasksImport.update({
  path: '/tasks',
  getParentRoute: () => rootRoute,
} as any)

const FormRoute = FormImport.update({
  path: '/form',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/form': {
      id: '/form'
      path: '/form'
      fullPath: '/form'
      preLoaderRoute: typeof FormImport
      parentRoute: typeof rootRoute
    }
    '/tasks': {
      id: '/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof TasksImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  FormRoute,
  TasksRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/form",
        "/tasks"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/form": {
      "filePath": "form.jsx"
    },
    "/tasks": {
      "filePath": "tasks.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
