import { useSelector, shallowEqual } from "react-redux";

export default function useObjectSelector(selector) {
  return useSelector(selector, shallowEqual)
}
