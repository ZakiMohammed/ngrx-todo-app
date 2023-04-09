# Ng Vanilla Todo App

A Vanilla Angular Todo App without any state management package.

## Initial Setup

```
ng new ng-vanilla-todo-app
```

## JSON Server

Install `json-server` globally:

```
npm install -g json-server
```

Read about `json-server` from here https://www.npmjs.com/package/json-server.

Create a db file with todos:

```
{
  "todos": [
    {
      "_id": "64326916cc99aa92789117d0",
      "title": "Ma. Francisco"
    }
  ]
}
```

Create `routes` file:

```
{
  "/api/*": "/$1"
}
```

Create `json-server` config file:

```
{
  "port": 3000,
  "routes": "server/routes.json",
  "watch": true,
  "id": "_id"
}
```

Add npm script in `package.json` file:

```
"scripts": {
  "json-server": "json-server server/db.json --config server/json-server.json"
}
```

## FontAwesome

```
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/free-brands-svg-icons
npm install @fortawesome/free-regular-svg-icons
npm install @fortawesome/angular-fontawesome@latest
```

Import FontAwesomeModule to AppModule:

```
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

...

@NgModule({
  declarations: [...],
  imports: [
    ...
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [...],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}

```

Usage:

```
<fa-icon icon="coffee"></fa-icon>
<fa-icon [icon]="['fab', 'angular']" size="lg"></fa-icon>
```
