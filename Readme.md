# Dynamic page rendering with NEXT.js

## Why? 🤔

I used this approach to implement a whitelabel solution at my current company (see demo [here](https://whitelabel.dev.dongxii.com)) where customers could create their own set of pages, dynamically fill theme with content and serve them through a SSR react app.

Instead of manually creating new pages by adding a `mypagexyz.js` file to NEXT.js's `/pages` directory, you define your pages in a remote JSON file.

## Quickstart 🚀

### 1. Install dependencies

```
yarn
# or
npm install
```

### 2. Start dev server

```
yarn dev
# or
npm run dev
```

This will spin up the demo project on [http://localhost:3000](http://localhost:3000) using [json-serve](https://github.com/typicode/json-server) to provide a basic REST API.

## How does it work? 🧙🏻‍♀️

As mentioned above, instead of having a dedicated JS file for every page, this app only requires a JSON config where you can define your pages. The path to the config is provided as an env variable (see `./dev.env`).

After starting the dev server you can have a look at the `/mockDB.json` file where all the API routes are defined.
The interesting part ist the `config` part which contains a `pages` property where you manage the pages that should be availabel on your site. The pages property is an array of page objects with the following structure:

```
{
  "href": "/", // Deinfes the pathe the page should be available at
  "label": "Home", // The name that shold ne used for the navbar and page title
  "content": [] // An array of supported Layout Elements
},
```

On every page request the following will happen

1. The custom Express.js server redirects all requests to the `/src/client/pages/_dynamic.tsx` page.
2. This page will check against the config wether there is a page defined for the specific URL
3. If there is a page defined it will redner the elements defined in the `content` property of the page config

## What can I configure 🤖

You can play around with it by modifiying the config prop defined in `./mockDB.json` (the json-server that is used in dev mode is running with `--watch` so you do not need to restart the server. Just reload the page in your browser to see the changes).

Since this is just a sample project there areonly 2 ELements that you can use to fill your pages.

### Markdown

```
{
  "type": "Markdown",
  "content": "# This is a headline"
}
```

### ProductList

**Note** This component will fetch some content from another API. This is still happening on the server side so SSR is still completely suported.

```
{
  "type": "ProductList",
  "content": ["1", "2", "3"], // List of productId that are available under the /products route
}
```

## Coming up next 🤗

Even though this is just a sample project to demonstrate the basic concept of how dynamic page rendering with NEXT.js can be achieved, I'm planning to add a few more things to it to illustrate a few more concepts I used when building up the whitelabel solution mentioned in the beginning.

| Feature                                           | Status |
| ------------------------------------------------- | ------ |
| Content details pages                             | -      |
| Dynamic configuration og the navbar items         | -      |
| Support for remote markdown in Markdown component | -      |

If you have more ideas of what definately should go in here, let me know!

## Still missing 😬

- Unit tests for UI components
- Some basic end-to-end tests

## Final words on project structure 🤓

The client side of this project is basically split up into 3 parts.

1. Redux services (`./src/client/services`)
2. Simple UI components (`./src/client/components`)
3. Rendering logig (`./src/client/pages`)

(sounds like the good ols MVC pattern 🙊)

I'm always trying to keep them as independent as possible from each other so that I can re-use them in a variety of apps I(usually 1. and 2. are either git submodules or npm dependencies I can plug into multiple projects).

My Redux services are a 1to1 representation of all the micros-service I have on my backend. So if there is e.g. a micro service for authentication, I have a dedicated Redux service on the client for it.

Using this structure allows me to reduce the time I have to invest in maintaining all my clients.
If there is e.g. a new backend service for commenting stuff I'l add a new redux service for it and can start using it on either my react-based web app or my react-native-based mobile apps.
