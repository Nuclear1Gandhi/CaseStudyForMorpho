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


