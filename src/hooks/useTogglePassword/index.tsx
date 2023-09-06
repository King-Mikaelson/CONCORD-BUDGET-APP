import { HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";


export default function useTogglePassword() {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? (
    <RxEyeClosed
      size={22}
      color="#005AE2"
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  ) : (
    <HiOutlineEye
      size={22}
      color="#005AE2"
      onClick={() => setVisibility((visiblity) => !visiblity)}
    />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
}