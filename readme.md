## To install the project run below commands step by step on root level of the project

- Install node 14.17.3
- yarn
- yarn bootstrap
- chmod -R +x scripts

## Versions Required

- Node - 14.17.3
- yarn - 1.22.5

## To run individual projects/packages use below commands in order

- yarn dev[-bus|helpcenter|train|flight|container|payment] [--ssr]

## To run full project together in development use below commands

- run `yarn dev` - only client side rendering will work
- run `yarn dev --ssr` - will enable server side rendering

## To run full project together in production use below commands

- 1st terminal -> yarn container-prod-build ( Not working #fixing )
- 2nd terminal -> yarn container-prod-serve ( Not working #fixing )

## List of important libraries used in this project

- Lerna -> https://lerna.js.org/
- Yarn workspaces -> https://classic.yarnpkg.com/en/docs/workspaces/
- webpack v5 -> https://webpack.js.org/
- React -> https://reactjs.org/
- Redux -> https://redux.js.org/
- React-Redux -> https://react-redux.js.org/
- Redux Code Splitting ( for reducers level code splitting ) -> https://redux.js.org/usage/code-splitting
- Tailwind CSS -> https://tailwindcss.com/
- TwinMacro -> https://github.com/ben-rogerson/twin.macro#readme
- Loadable Components for SSR and Code Splitting -> https://loadable-components.com/
- Jotai ( for local and UI Level state ) -> https://jotai.pmnd.rs/
- Jest -> https://jestjs.io/
- Testing Library -> https://testing-library.com/docs/

## To install packages

- If package is used in every project then install at the root of the project. To install at the root, go at the root and provide a flag -W. For eg -> yarn install -W -D webpack
- If package is used in a specific project then install it in that project.

## Knowledge Material Links

- Twin Macro -> https://github.com/ben-rogerson/twin.macro/blob/master/docs/options.md
