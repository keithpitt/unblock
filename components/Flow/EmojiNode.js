import { memo, useContext } from "react";
import { EmojiContext } from "../../context/EmojiContext";
import useStore from "./store";
import Label from "./Label";

const EmojiNode = ({data}) => {
  const emoji = useContext(EmojiContext);

  const updateNodeData = useStore((state) => state.updateNodeData);

  const onDoubleClick = (event) => {
    updateNodeData(id, ({ data }) => {
      return { emoji: prompt("Enter an emoji", data.emoji) };
    });
  };

  return (
    <>
      <div onDoubleClick={onDoubleClick}>
        <Label emoji={emoji}>{`:${data.emoji}:`}</Label>
      </div>
    </>
  );
};

export default memo(EmojiNode);
