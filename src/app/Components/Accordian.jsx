// components/Accordion.js
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
function Accordion({ id, title, isOpen, onToggle, children }) {
    return (
      <div className="border-b">
        <button
          className="flex justify-between w-full p-4 text-left text-[#565556] text-lg font-semibold bg-[#ffffff]  hover:bg-gray-100"
          onClick={() => onToggle(id)}
        >
          {title}
          <span>{isOpen ? <KeyboardArrowUpIcon/> :<KeyboardArrowDownIcon/> }</span>
        </button>
        {isOpen && <div className="p-4">{children}</div>}
      </div>
    );
  }
  
  export default Accordion;
  