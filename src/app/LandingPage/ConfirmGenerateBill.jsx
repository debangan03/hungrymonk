import React,{useState} from 'react';

function GenerateBillModal({ isOpen, onClose, onConfirm }) {
  const [buttonclicked, setbuttonclicked] = useState(false);
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-[#FFF9EA] rounded-lg shadow-lg p-6 relative z-10 lg:w-1/3 w-full mx-4">
        <h2 className="text-2xl font-semibold mb-2 text-center">Generate Bill</h2>
        <hr className='mb-4 h-[1px] border-[#2c0719]'/>
        <p className="mb-6">Done with your meal ?<br/>Are you sure you want to generate the bill?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 border-[#441029] text-gray-800 rounded "
          >
            No, Cancel
          </button>
          <button
            onClick={()=>{setbuttonclicked(true);onConfirm()}}
            disabled={buttonclicked}
            className="px-4 py-2 bg-[#441029] disabled:scale-95 diabled:bg-[#7c3155] text-white rounded "
          >
            Yes, Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenerateBillModal;