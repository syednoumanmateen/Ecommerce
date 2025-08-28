import { memo } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

const Accordion = ({ title, children, isOpen, toggle }) => (
  <div className="border-b">
    <button
      className="w-full flex justify-between items-center py-5 text-left"
      onClick={toggle}
      aria-expanded={isOpen}
    >
      <span>{title}</span>
      <span>{isOpen ? <GoChevronDown /> : <GoChevronUp />}</span>
    </button>
    {isOpen && <div className="pl-4 pb-2">{children}</div>}
  </div>
);

export default memo(Accordion)
