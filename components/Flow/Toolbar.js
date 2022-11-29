import styles from "./Toolbar.module.scss";

const Svg = ({ children, active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    fill="none"
    viewBox="0 0 36 36"
    className={active ? styles.activeicon : styles.icon}
  >
    {children}
  </svg>
);

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
);

const NewSectionIcon = ({ active = false }) => (
  <Svg active={active}>
    <path
      d="M8.25 12.125C8.25 11.5037 8.75368 11 9.375 11H15.375C15.9963 11 16.5 11.5037 16.5 12.125V15.875C16.5 16.4963 15.9963 17 15.375 17H9.375C8.75368 17 8.25 16.4963 8.25 15.875V12.125Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.25 13.625C20.25 13.0037 20.7537 12.5 21.375 12.5H26.625C27.2463 12.5 27.75 13.0037 27.75 13.625V21.875C27.75 22.4963 27.2463 23 26.625 23H21.375C20.7537 23 20.25 22.4963 20.25 21.875V13.625Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.75 21.125C9.75 20.5037 10.2537 20 10.875 20H16.125C16.7463 20 17.25 20.5037 17.25 21.125V23.375C17.25 23.9963 16.7463 24.5 16.125 24.5H10.875C10.2537 24.5 9.75 23.9963 9.75 23.375V21.125Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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
);

const GifIcon = ({ active = false }) => (
  <Svg>
    <path
      d="M19.5 14.25C19.5 13.8358 19.1642 13.5 18.75 13.5C18.3358 13.5 18 13.8358 18 14.25H19.5ZM18 21.75C18 22.1642 18.3358 22.5 18.75 22.5C19.1642 22.5 19.5 22.1642 19.5 21.75H18ZM21.75 14.25V13.5C21.3358 13.5 21 13.8358 21 14.25H21.75ZM24.75 15C25.1642 15 25.5 14.6642 25.5 14.25C25.5 13.8358 25.1642 13.5 24.75 13.5V15ZM21 21.75C21 22.1642 21.3358 22.5 21.75 22.5C22.1642 22.5 22.5 22.1642 22.5 21.75H21ZM24 18.75C24.4142 18.75 24.75 18.4142 24.75 18C24.75 17.5858 24.4142 17.25 24 17.25V18.75ZM15.75 20.6517L16.3636 21.083C16.4524 20.9567 16.5 20.806 16.5 20.6517H15.75ZM12.0221 20.6517L11.4085 21.083L11.4085 21.083L12.0221 20.6517ZM12.0221 15.3483L11.4085 14.917L11.4085 14.917L12.0221 15.3483ZM15.1364 15.7797C15.3746 16.1185 15.8424 16.2001 16.1813 15.9619C16.5202 15.7237 16.6018 15.2559 16.3636 14.917L15.1364 15.7797ZM14.25 17.25C13.8358 17.25 13.5 17.5858 13.5 18C13.5 18.4142 13.8358 18.75 14.25 18.75V17.25ZM15.75 18H16.5C16.5 17.5858 16.1642 17.25 15.75 17.25V18ZM10.5 11.25H25.5V9.75H10.5V11.25ZM27 12.75V23.25H28.5V12.75H27ZM25.5 24.75H10.5V26.25H25.5V24.75ZM9 23.25V12.75H7.5V23.25H9ZM10.5 24.75C9.67157 24.75 9 24.0784 9 23.25H7.5C7.5 24.9069 8.84315 26.25 10.5 26.25V24.75ZM27 23.25C27 24.0784 26.3284 24.75 25.5 24.75V26.25C27.1569 26.25 28.5 24.9069 28.5 23.25H27ZM25.5 11.25C26.3284 11.25 27 11.9216 27 12.75H28.5C28.5 11.0931 27.1569 9.75 25.5 9.75V11.25ZM10.5 9.75C8.84315 9.75 7.5 11.0931 7.5 12.75H9C9 11.9216 9.67157 11.25 10.5 11.25V9.75ZM18 14.25V21.75H19.5V14.25H18ZM21.75 15H24.75V13.5H21.75V15ZM21 14.25V18H22.5V14.25H21ZM21 18V21.75H22.5V18H21ZM21.75 18.75H24V17.25H21.75V18.75ZM15.1364 20.2203C14.7323 20.7953 14.2688 21 13.886 21C13.5033 21 13.0398 20.7953 12.6357 20.2203L11.4085 21.083C12.0338 21.9725 12.9195 22.5 13.886 22.5C14.8525 22.5 15.7383 21.9725 16.3636 21.083L15.1364 20.2203ZM12.6357 20.2203C12.2262 19.6379 12 18.8367 12 18C12 17.1633 12.2262 16.3621 12.6357 15.7797L11.4085 14.917C10.7885 15.799 10.5 16.9173 10.5 18C10.5 19.0827 10.7885 20.201 11.4085 21.083L12.6357 20.2203ZM12.6357 15.7797C13.0398 15.2047 13.5033 15 13.886 15C14.2688 15 14.7323 15.2047 15.1364 15.7797L16.3636 14.917C15.7383 14.0275 14.8525 13.5 13.886 13.5C12.9195 13.5 12.0338 14.0275 11.4085 14.917L12.6357 15.7797ZM14.25 18.75H15.75V17.25H14.25V18.75ZM16.5 20.6517V18H15V20.6517H16.5Z"
      fill="currentColor"
    />
  </Svg>
);

const Toolbar = ({ mode, onButtonClick }) => (
  <div className={styles.container}>
    <button type="button" onClick={() => onButtonClick("move")}>
      <MoveIcon active={mode == "move"} />
    </button>
    <button type="button" onClick={() => onButtonClick("section")}>
      <NewSectionIcon active={mode == "section"} />
    </button>
    <button type="button" onClick={() => onButtonClick("emoji")}>
      <EmojiIcon active={mode == "emoji"} />
    </button>
    <button type="button" onClick={() => onButtonClick("media")}>
      <GifIcon active={mode == "media"} />
    </button>
  </div>
);

export default Toolbar;
