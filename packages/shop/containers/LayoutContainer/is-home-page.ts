import {
  HOME_PAGE,
  WINE_PAGE,
  OPORTO_PAGE,
  VERMOUTH_PAGE,
  SPIRITS_PAGE,
} from "constants/navigation";
const arr = [HOME_PAGE, WINE_PAGE, OPORTO_PAGE, VERMOUTH_PAGE, SPIRITS_PAGE];
export function isCategoryPage(pathname) {
  return arr.includes(pathname);
}
