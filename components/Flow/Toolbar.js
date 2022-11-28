import styles from "./Toolbar.module.scss";

const Svg = ({ children, active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    fill="none"
    viewBox="0 0 36 36"
    className={(active) ? styles.activeicon : styles.icon}
  >
    {children}
  </svg>
)

const MoveIcon = ({ active = false }) => (
  <Svg active={active}>
    <rect
      width="14"
      height="18"
      x="11"
      y="9"
      stroke="currentColor"
      strokeWidth="1.5"
      rx="6"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 16v-3"
    />
  </Svg>
)

const NewSectionIcon = ({ active = false }) => (
  <Svg active={active}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 15v6M21 18h-6"
    />
    <rect
      width="18"
      height="18"
      x="9"
      y="9"
      stroke="currentColor"
      strokeWidth="1.5"
      rx="4"
    />
  </Svg>
)

const EmojiIcon = ({ active = false }) => (
  <Svg active={active}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M18 28c5.523 0 10-4.477 10-10S23.523 8 18 8 8 12.477 8 18s4.477 10 10 10z"
    />
    <path
      fill="currentColor"
      d="M14.5 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM21.5 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M13 19c.833 2.667 2.5 4 5 4s4.167-1.333 5-4H13z"
      clipRule="evenodd"
    />
  </Svg>
)

const Toolbar = ({mode, onButtonClick}) => (
  <div className={styles.container}>
    <button type="button" onClick={() => onButtonClick('move')}><MoveIcon active={mode == 'move'} /></button>
    <button type="button" onClick={() => onButtonClick('section')}><NewSectionIcon active={mode == 'section'} /></button>
    <button type="button" onClick={() => onButtonClick('emoji')}><EmojiIcon active={mode == 'emoji'} /></button>
    <button type="button" onClick={() => onButtonClick('media')}><EmojiIcon active={mode == 'media'} /></button>
  </div>
)

export default Toolbar
