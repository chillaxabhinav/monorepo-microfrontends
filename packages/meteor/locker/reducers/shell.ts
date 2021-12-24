import { Action } from "redux";

export type ShellState = {
    useragent: {
        isMobile: boolean,
        isBot: boolean
    }
}
const initialState: ShellState = {
  useragent: {
      isBot: false,
      isMobile: false
  }
}

export default (state = initialState, {type, payload}: {payload: Partial<ShellState>} & Action) => {
    switch (type) {
        case "SET_SHELL_PARAM":
            return {...state, ...payload};
        default:
            break;
    }
    return state;
}
