import { atom } from "recoil";

const loginState = atom({
  key: "loginState", // unique ID (다른 atoms/selectors을 구별하기 위해서)
  default: false, // default value (aka initial value)
});

const userInfoState = atom({
  key: "userInfoState",
  default: {},
});

export { loginState, userInfoState };
