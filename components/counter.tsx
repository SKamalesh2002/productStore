import { useDispatch } from "react-redux";
import { increment, decrement } from "../store/slices/slice";
import { FC } from "react";
import { Button } from "@chakra-ui/react";

interface Props {}

const Counter: FC<Props> = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
    </>
  );
};

export default Counter;
