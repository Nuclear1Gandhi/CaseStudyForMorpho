# Case study for morpho

## Stack

- Tailwind
- View/Wagmi
- React/Nextjs
- Typescript
- Prettier/eslint
- PNPM

## Structure

Project uses atomic components folder structure:

- atoms -> e.g input, button, radio button. Keep those as simple as possible, if lets say you put an input
  in it that input should be the simplest input used in the project if there is input without
  label then your input should probably be a molecule and the base input without label should be in atoms

- molecules -> usually simple combination of two atoms, or small change to the atom
- organisms -> more complex components for example: panel with two buttons + some text structure

---

I store all the text displayed on page in app/content.tsx this is to be reconsidered as usually i would use
something like i18n for translation which would then store all the text 


---

You will need following env variables to run this properly:

NEXT_PUBLIC_WC_PROJECT_ID="" -> the id of wallet connect project to connect to app

NEXT_PUBLIC_METAMORPHO_FACTORY_ADDRESS="0xA9c3D3a366466Fa809d1Ae982Fb2c46E5fC41101"

NEXT_PUBLIC_ETHERSCAN_LINK="https://etherscan.io/"

NEXT_PUBLIC_RPC_URL="" - rpc url

NEXT_PUBLIC_CHAIN_ID="2" -> 2 so that we can test chain switching
