# Storyblok && Next.js Playground
Exploring set up of Storyblok and Next.js.

:warning: This repo is very "rough" around the edges. It's in POC state. Components aren't broken out, etc. But, it's in a working state.

## Usage
Create an `.env.local` file with two keys.
```
NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN=<YOUR PREVIEW TOKEN FROM STORYBLOK>
STORYBLOK_PREVIEW_SECRET=<CAN BE ANYTHING YOU LIKE>
```
The `NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN` needs to be the "Preview token" you can grab from your Storyblok space.

The `STORYBLOK_PREVIEW_SECRET` can be anything you like. But, this is being used for Next.js preview mode. This secret needs to match whatever secret you pass in your Storyblok preview url.

Then, it's the usual.

```
yarn / npm install
```

And

```
next dev/build
```

## TODO
- Explore Storybook integration
- Set up GraphQL queries
- Real time input mode!

---

Play by jh3y ʕ´•ᴥ•`ʔ 2021