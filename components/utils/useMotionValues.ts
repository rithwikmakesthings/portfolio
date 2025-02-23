import { useMotionValue } from "framer-motion";

/* eslint-disable react-hooks/rules-of-hooks */
const useMotionValues = (size: number, valueFn: (i?: number) => any) =>
  Array.from({ length: size }, (_, i) => useMotionValue(valueFn(i)));

export default useMotionValues;
