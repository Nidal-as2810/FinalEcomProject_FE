import { notFocusedStyle, focuseStyle } from "../../utils/inputUtils";

export const reducer = (state, action) => {
  switch (action.type) {
    case "username":
      return { ...state, username: action.payload };
    case "validUser":
      return { ...state, userIsValid: action.payload };
    case "userFocus":
      return {
        ...state,
        userIsFocused: action.payload,
        userLabel:
          state.userIsFocused && !state.username
            ? notFocusedStyle
            : focuseStyle,
      };
    case "password":
      return { ...state, password: action.payload };
    case "validPassword":
      return { ...state, passwordIsValid: action.payload };
    case "passwordFocus":
      return {
        ...state,
        passwordIsFocused: action.payload,
        passLabel:
          state.passwordIsFocused && !state.password
            ? notFocusedStyle
            : focuseStyle,
      };
    case "match":
      return { ...state, passMatch: action.payload };
    case "validMatch":
      return { ...state, passMatchIsValid: action.payload };
    case "matchFocus":
      return {
        ...state,
        passMatchIsFocused: action.payload,
        matchLabel:
          state.passMatchIsFocused && !state.passMatch
            ? notFocusedStyle
            : focuseStyle,
      };
    default:
      throw new Error();
  }
};
