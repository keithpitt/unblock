import { useContext } from "react";
import { EmojiContext } from "../../context/EmojiContext";

function emojify(text, emojis) {
  return text.replace(/:([\w+-]+):/gm, function (original, name) {
    if (emojis[name]) {
      return (
        '<img width="16" class="emoji" src="' +
        emojis[name] +
        '" alt="' +
        name +
        '">'
      );
    } else {
      return original;
    }
  });
}

const Label = ({ children }) => {
  const emoji = useContext(EmojiContext);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 5 }}
      dangerouslySetInnerHTML={{ __html: emojify(children, emoji) }}
    />
  );
};

export default Label;
