import { notFocusedStyle, focuseStyle } from "../../utils/inputUtils";

export const reducer = (state, action) => {
  switch (action.type) {
    case "firstnameFocus":
      return {
        ...state,
        firstnameIsFocused: action.payload,
        firstnameLabel:
          state.firstnameIsFocused && !state.firstname
            ? notFocusedStyle
            : focuseStyle,
      };
    case "lastnameFocus":
      return {
        ...state,
        lastnameIsFocused: action.payload,
        lastnameLabel:
          state.lastnameIsFocused && !state.lastname
            ? notFocusedStyle
            : focuseStyle,
      };
    case "emailFocus":
      return {
        ...state,
        emailIsFocused: action.payload,
        emailLabel:
          state.emailIsFocused && !state.email ? notFocusedStyle : focuseStyle,
      };
    case "countryFocus":
      return {
        ...state,
        countryIsFocused: action.payload,
        countryLabel:
          state.countryIsFocused && !state.country
            ? notFocusedStyle
            : focuseStyle,
      };
    case "addressFocus":
      return {
        ...state,
        addressIsFocused: action.payload,
        addressLabel:
          state.addressIsFocused && !state.address
            ? notFocusedStyle
            : focuseStyle,
      };
    case "cityFocus":
      return {
        ...state,
        cityIsFocused: action.payload,
        cityLabel:
          state.cityIsFocused && !state.city ? notFocusedStyle : focuseStyle,
      };
    case "phoneFocus":
      return {
        ...state,
        phoneIsFocused: action.payload,
        phoneLabel:
          state.phoneIsFocused && !state.phone ? notFocusedStyle : focuseStyle,
      };
    case "firstname":
      return {
        ...state,
        firstname: action.payload,
        firstnameLabel:
          state.firstnameIsFocused && !state.firstname
            ? notFocusedStyle
            : focuseStyle,
      };
    case "lastname":
      return {
        ...state,
        lastname: action.payload,
        lastnameLabel:
          state.lastnameIsFocused && !state.lastname
            ? notFocusedStyle
            : focuseStyle,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
        emailLabel:
          state.emailIsFocused && !state.email ? notFocusedStyle : focuseStyle,
      };
    case "country":
      return {
        ...state,
        country: action.payload,
        countryLabel:
          state.countryIsFocused && !state.country
            ? notFocusedStyle
            : focuseStyle,
      };
    case "city":
      return {
        ...state,
        city: action.payload,
        cityLabel:
          state.cityIsFocused && !state.city ? notFocusedStyle : focuseStyle,
      };
    case "phone":
      return {
        ...state,
        phone: action.payload,
        phoneLabel:
          state.phoneIsFocused && !state.phone ? notFocusedStyle : focuseStyle,
      };
    case "address":
      return {
        ...state,
        address: action.payload,
        addressLabel:
          state.addressIsFocused && !state.address
            ? notFocusedStyle
            : focuseStyle,
      };
    default:
      throw new Error();
  }
};
