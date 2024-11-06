export enum State {
  WrongNetwork = 'WrongNetwork',
  Connect = 'Connect',
  Input = 'Input',
  Withdraw = 'Withdraw',
  Success = "Success",
  Failure = "Failure",
  Pending = "Pending"
}

export const Content = {
  [State.WrongNetwork]: {
    "title": "Wrong network",
    "description": "You are not on Mainnet. Please click the button below to switch.",
    "icon": "/svg/general/ExclamationMark.svg",
    "button": "Switch",
    "buttonLoading": "Loading..."
  },
  [State.Connect]: {
    "title": "Welcome to Morpho",
    "description": "To get started, please connect your wallet below",
    "icon": "/svg/logos/Morpho.svg",
    "button": "Connect Wallet",
    "buttonLoading": "Loading..."
  },
  [State.Input]: {
    "label": "MetaMorpho Address",
    "placeholder": "0xabc...12345",
    "validAddressIcon": "/svg/general/RoundCheckmark.svg",
    "invalidAddressIcon": "/svg/general/ExclamationMark.svg",
    "errorInvalidVaultAddress": 'Address is not a valid MetaMorpho vault',
    "genericError": "Something went wrong, call failed",
    "InvalidAddressError": "Input is not an address",
  },
  [State.Withdraw]: {
    "sharesLabel": "User shares",
    "assetsLabel": "User assets",
    "button": "Withdraw",
    "signButton": "Sign your transaction..."
  },
  [State.Success]: {
    "title": 'Success!',
    "icon": '/svg/general/RoundCheckmark.svg',
    "description": (amount: string, symbol: string) => `You have received ${amount} ${symbol}`,
    "button": 'Reset'
  },
  [State.Failure]: {
    "title": "Oh no!",
    "icon": "/svg/general/ExclamationMark.svg",
    "description": 'Please try again.',
    "button": 'Retry'
  },
  [State.Pending]: {
    "title": 'Your transaction is pending',
    "description": 'View on',
    "explorer": 'Etherscan',
    "button": 'Transaction finalizing...'
  }
} as const