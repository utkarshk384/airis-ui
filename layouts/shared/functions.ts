import { deleteCookie } from "@utils/cookie";

export const ClearStorages = () => {
  localStorage.clear();
  deleteCookie("id");
  deleteCookie("token");
  deleteCookie("userId");
  deleteCookie("roleId");
};
