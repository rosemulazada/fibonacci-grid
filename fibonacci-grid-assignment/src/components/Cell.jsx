export default function Cell({ value, highlighted, onClick }) {
    const baseClasses =
        "h-8 w-8 rounded-md text-xs hover:border-2 hover:border-lime-500 dark:border dark:border-[#41453b]";

    const highlightClasses = highlighted
        ? "bg-lime-500 font-bold dark:text-[#333]"
        : "bg-gray-200 font-medium dark:bg-[#333] dark:text-[#eee]";

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${highlightClasses} transition-colors duration-500`}
        >
            {value}
        </button>
    );
}
