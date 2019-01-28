# Dynamic page rendering with NEXT.js

## Why? 🤔

I used this approach to implement a whitelabel solution at my current company (see demo [here](https://whitelabel.dev.dongxii.com)).
Under the hood this project runs [NEXT.js](https://nextjs.org) but instead of manually adding pages to NEXT.js's `/pages` directory, everything is managed with a remote JSON config.

This was our customers can define their own set of pages, dynamically fill theme with content the need on each page and serve them through a SSR react app.

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

This will spin up the demo project on [http://localhost:3000](http://localhost:3000). The dev environment is also configured to run a simple [json-serve](https://github.com/typicode/json-server) which provides the needed API endpoints to run this project.

## How does it work? 🧙🏻‍♀️

As mentioned above, instead of having a dedicated JS file for every page, this app only requires a JSON config where you list your pages. The path to this remote config is provided as an env variable (see `./dev.env`) to the app.

After starting the dev server, have a look at the `/mockDB.json` file where all the API routes are defined.
You can play around with it by modifiying the `config` (the json-server that is used in dev mode is running with `--watch` so you do not need to restart the server. Just reload the page in your browser to see the changes).
The interesting part is the `pages` array property which defines which pages should be available and what to show on them.

A page usually has the following properties:

```
{
  "href": "/", // Defines the path where this page will be available
  "label": "Home", // The name that is used in the navigation & page title
  "content": [] // An array of supported Layout Elements
},
```

On every page request the following happens

1. The custom Express.js server redirects all requests to the `/src/client/pages/_dynamic.tsx` page.
2. This page checks against the config wether there is something to show for the specific URL
3. If there is a page defined it renders the elements defined in the `content` property of the page

## What can I configure 🤖

Since this is just a sample project there areonly 2 Elements that you can use to fill your pages.

### Markdown

```
{
  "type": "Markdown",
  "content": "# This is a headline"
}
```

### ProductList

**Note** This component will fetch products from another API endpoint. This is still happening on the server side so SSR is fully suported.

```
{
  "type": "ProductList",
  "content": ["1", "2", "3"], // List of productId that are available under the /products route
}
```

## Coming up next 🤗

Even though this is just a sample project to demonstrate the basic concept of how dynamic page rendering with NEXT.js can be achieved, I'm planning to add a more features to illustrate a few more concepts I used when building the whitelabel solution mentioned above.

| Feature                                            | Status |
| -------------------------------------------------- | ------ |
| Content detail pages                               | -      |
| Navbar configuration (allow to add "hidden" pages) | -      |
| Fetch markdown from remote in Markdown component   | -      |
| Even more generic Elements (bring your own API)    | -      |

If you have more ideas, let me know!

## Still missing 😬

- Unit tests for UI components
- Some basic end-to-end tests

## Final words on project structure 🤓

The client side of this project is basically split up into 3 parts.

1. Redux services (`./src/client/services`)
2. Simple UI components (`./src/client/components`)
3. Rendering logig (`./src/client/pages`)

(sounds like the good ols MVC pattern 🙊)

I'm always trying to keep them as independent as possible from each other so that I can re-use them in a variety of apps (usually 1. and 2. are either git submodules or npm dependencies).

My Redux services are a 1to1 representation of all the micros-service I have on my backend. So if there is e.g. a micro service for authentication, I have a dedicated Redux service on the client for it.

Using this structure allows me to reduce the time I have to invest in maintaining all my clients.
If there is e.g. a new backend service for commenting stuff I'l add a new redux service for it and can start using it on either my react-based web app or my react-native-based mobile apps.
