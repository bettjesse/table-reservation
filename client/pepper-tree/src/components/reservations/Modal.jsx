 import { useDispatch } from 'react-redux';
 import { setReservationData } from '../../slices/reservationSlice';
import "../../index.css"
import Loader from '../Loader';

// const Modal = ({ isOpen, availability, onClose, onTableSelect, isLoading }) => {
//   const dispatch = useDispatch();

//   if (!isOpen) return null;

//   const handleTableSelect = (table) => {
//     dispatch(
//       setReservationData({
//         tableId: table._id, // Store the selected tableId
//       })
//     );
//     console.log("TABLE", table._id);

//     onTableSelect();
//     onClose(); // Close the modal after selecting a table
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 
//           ${isOpen ? 'block' : 'hidden'} sm:bg-transparent sm:opacity-100 sm:flex sm:justify-center sm:items-center`}
//     >
//       <div
//         className="bg-red-400 p-6 rounded shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-auto sm:relative"
//         style={{
//           maxHeight: '80vh',
//           height: 'auto',
//         }}
//       >
//         {/* Close Icon */}
//         <span
//           onClick={onClose}
//           className="absolute top-3 right-3 text-black font-bold text-3xl cursor-pointer hover:text-gray-700"
//           role="button"
//           aria-label="Close"
//         >
//           &times;
//         </span>

//         {/* Loading Spinner */}
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <div className="loader border-t-4 border-red-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
//           </div>
//         ) : availability && availability.availableTables.length > 0 ? (
//           <div>
//             <p className="text-sm md:text-base mb-4">We found the following available tables:</p>
//             <p className="text-xs md:text-sm mb-4">Please select one</p>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {availability.availableTables.map((table) => (
//                 <div
//                   key={table._id}
//                   className="bg-gray-100 rounded-lg shadow-sm p-3 flex flex-col items-center justify-between cursor-pointer"
//                   onClick={() => handleTableSelect(table)}
//                 >
//                   <span className="text-sm sm:text-base mb-2">
//                     Table for {table.capacity} - {table.tableNumber}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p className="text-sm md:text-base">
//             No tables available for your selection. Please try a different time or date.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Modal;

const Modal = ({ isOpen, availability, onClose, onTableSelect, isLoading }) => {
    const dispatch = useDispatch();
  
    if (!isOpen) return null;
  
    const handleTableSelect = (table) => {
      dispatch(
        setReservationData({
          tableId: table._id, // Store the selected tableId
        })
      );
      console.log("TABLE", table._id);
  
      onTableSelect();
      onClose(); // Close the modal after selecting a table
    };
  
    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 
              ${isOpen ? "block" : "hidden"} sm:bg-transparent sm:opacity-100 sm:flex sm:justify-center sm:items-center`}
      >
        <div
          className="bg-red-400 p-6 rounded shadow-md w-full sm:w-4/5 md:w-3/4 lg:w-2/3 max-h-[80vh] overflow-auto sm:relative"
          style={{
            maxHeight: "80vh",
            height: "auto",
          }}
        >
          {/* Close Icon */}
          <span
            onClick={onClose}
            className="absolute top-3 right-3 text-black font-bold text-3xl cursor-pointer hover:text-gray-700"
            role="button"
            aria-label="Close"
          >
            &times;
          </span>
  
          {/* Loading Spinner */}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="loader border-t-4 border-red-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : availability && availability.availableTables?.length > 0 ? (
            <div>
              <p className="text-sm md:text-base mb-4">We found the following available tables:</p>
              <p className="text-xs md:text-sm mb-4">Please select one</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {availability.availableTables.map((table) => (
                  <div
                    key={table._id}
                    className="bg-gray-100 rounded-lg shadow-sm p-3 flex flex-col items-center justify-between cursor-pointer"
                    onClick={() => handleTableSelect(table)}
                  >
                    <span className="text-sm sm:text-base mb-2">
                      Table for {table.capacity} - {table.tableNumber}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm md:text-base">
              {availability ? "No tables available for your selection. Please try a different time or date." : <Loader />}
            </p>
          )}
        </div>
      </div>
    );
  };
  
  export default Modal;
  
  
  
