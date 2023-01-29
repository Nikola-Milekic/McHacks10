type RoundButtonProps = {
  page: string;
};

const RoundButton: React.FC<RoundButtonProps> = ({ page }) => {
  return (
    <a
      className="fixed bottom-14 left-10 lg:left-20 inline-block rounded-full border border-primary p-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring active:bg-indigo-700"
      href={page}
    >
      <span className="sr-only"> Download </span>

      <svg
        className="h-5 w-5 transform rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </a>
  );
};
export default RoundButton;
