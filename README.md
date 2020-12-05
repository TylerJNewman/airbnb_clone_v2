# HomeAway

_Next.js + Typescript + GraphQL + MongoDB_

Production-ready home sharing application, inspired by sites like Airbnb. The
Next.js framework comes with hybrid static & server rendering, TypeScript
support, smart bundling, route pre-fetching, and more. GraphQl, Apollo and
MongoDB provides an expressive to query, load and cache data.

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with
[MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.example` file in this directory to `.env` (which will be ignored
by Git):

```bash
cp .env.example .env
```

Set each variable on `.env`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using
  [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the
  "Connect" button for your cluster.
- `MONGODB_DB` - The name of the MongoDB database you want to use.

### Installation

Install dependencies for the project with

```bash
npm install
```

First, install all the dependencies:

```bash
npm install
# or
yarn
```

And run the seed file with:

```bash
npm run seed
# or
yarn seed
```

If you need to seed against you can clear the database first with:

```bash
npm run clear
# or
yarn clear
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result. The GraphQL Playground console is available at
[http://localhost:3000/api](http://localhost:3000/api).

To introspect a GraphQL schema from the GraphQL server make sure the server is
running run fun the following command:

```bash
npm run introspect
# or
yarn introspect
```

To generate Typescript files from GraphQL schema run following command:

```bash
npm run generate
# or
yarn generate
```

#### Using Vercel

You will need to install and configure the
[Sentry Vercel integration](https://docs.sentry.io/workflow/integrations/vercel).
After you've completed the project linking step, all the needed environment
variables will be set in your Vercel project, with the exception of
`NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR`, which should be set to `/var/task/`.

> **Note:** A Vercel project connected to a
> [Git integration](https://vercel.com/docs/v2/platform/deployments#git-integration)
> is required before adding the Sentry integration.

#### Without Using Vercel

1. Set up the `NEXT_PUBLIC_SENTRY_DSN` environment variable as described above.
2. Save your Sentry organization slug as the `SENTRY_ORG` environment variable
   and your project slug as the `SENTRY_PROJECT` environment variable in
   `.env.local`.
3. Save your git provider's commit SHA as either `VERCEL_GITHUB_COMMIT_SHA`,
   `VERCEL_GITLAB_COMMIT_SHA`, or `VERCEL_BITBUCKET_COMMIT_SHA` environment
   variable in `.env.local`.
4. Create an auth token in Sentry. The recommended way to do this is by creating
   a new internal integration for your organization. To do so, go into
   **Settings > Developer Settings > New internal integration**. After the
   integration is created, copy the Token.
5. Save the token inside the `SENTRY_AUTH_TOKEN` environment variable in
   `.env.local`.
6. Set `NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR` to the absolute path of the folder
   the Next.js app is running from

> **Note:** Sourcemap upload is disabled in development mode using the
> `NODE_ENV` environment variable. To change this behavior, remove the
> `NODE_ENV === 'production'` check from your `next.config.js` file.

## Other configuration options

More configurations are available for the
[Sentry webpack plugin](https://github.com/getsentry/sentry-webpack-plugin)
using
[Sentry Configuration variables](https://docs.sentry.io/cli/configuration/) for
defining the releases/verbosity/etc.

## Notes

- By default, neither sourcemaps nor error tracking are enabled in development
  mode (see Configuration).
- When enabled in development mode, error handling
  [works differently than in production](https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page)
  as `_error.js` is never actually called.
- The build output will contain warning about unhandled Promise rejections. This
  is caused by the test pages, and is expected. When deploying to Vercel,
  "Client Error 1" will actually be sent to Sentry during the build, while that
  test page is being statically rendered.
- The version of `@zeit/next-source-maps` (`0.0.4-canary.1`) is important and
  must be specified since it is not yet the default. Otherwise
  [source maps will not be generated for the server](https://github.com/zeit/next-plugins/issues/377).
- Both `@zeit/next-source-maps` and `@sentry/webpack-plugin` are added to
  dependencies (rather than `devDependencies`) because if used with SSR, these
  plugins are used during production for generating the source-maps and sending
  them to sentry.

## Deploy on Vercel

You can deploy this app to the cloud with
[Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example)
([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and
[import to Vercel](https://vercel.com/import/git?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on
**Environment Variables** and set them to match your `.env` file.

## Built With

| Technology                                                                   | Description                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------- |
| [Node.js](https://www.npmjs.com/)                                            | Runtime environment and npm package manager |
| [Nextjs](https://nextjs.org/)                                                | React Product Framework                     |
| [MongoDB](https://www.mongodb.com/)                                          | Document database                           |
| [Apollo GaphQL](https://www.apollographql.com/)                              | Platform for buidling Data Graph            |
| [React](https://reactjs.org/)                                                | Used to build main components               |
| [Sentry](https://sentry.io/)                                                 | Cloud-based error monitoring                |
| [Stripe](https://www.docker.com/)                                            | Payment processing platform                 |
| [Typescript](https://typescriptlang.org/)                                    | Language for application-scale JavaScript   |
| [Ant Design](https://ant.design/)                                            | Design system for enterprise-level products |
| [Vercel](https://vercel.com/)                                                | Cloud Platform to deploy instantly          |
| [Ant Design](https://ant.design/)                                            | Design system for enterprise-level products |
| [Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in) | OAuth 2.0 flow and token lifecycle          |
