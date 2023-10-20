import React, { useState } from "react";
import "./Navbar.css";
import { VscSettings } from "react-icons/vsc";
import { BiChevronDown } from "react-icons/bi";

const Navbar = ({ setFilteredByPriority, toggleView, showUsers }) => {
  const [isDropCardOpen, setDropCardOpen] = useState(false);

  const toggleDropCard = () => {
    setDropCardOpen(!isDropCardOpen);
  };

  const filterByPriority = () => {
    setFilteredByPriority(true); // Pass the filter state to the parent component
    setDropCardOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="display-wrapper" onClick={toggleDropCard}>
        <VscSettings className="nav-icon" />
        Display
        <BiChevronDown
          className={`nav-down-icon ${isDropCardOpen ? "rotate-180" : ""}`}
        />
      </div>
      {isDropCardOpen && (
        <div className="drop-card">
          <div className="filter">
            <p>Grouping</p>
            <div className="display-wrapper" onClick={toggleView}>
              {showUsers ? "Status" : "Users"}{" "}
              {/* Toggle between "Users" and "Status" */}
              <BiChevronDown className="nav-down-icon" />
            </div>
          </div>
          <div className="filter" onClick={filterByPriority}>
            <p>Ordering</p>
            <div className="display-wrapper">
              Priority
              <BiChevronDown className="nav-down-icon" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
// import React, { useState } from "react";
// import "./Navbar.css";
// import { VscSettings } from "react-icons/vsc";
// import { BiChevronDown } from "react-icons/bi";

// const Navbar = ({ setFilteredByPriority, toggleView, showUsers }) => {
//   const [isDropCardOpen, setDropCardOpen] = useState(false);

//   const toggleDropCard = () => {
//     setDropCardOpen(!isDropCardOpen);
//   };

//   const filterByPriority = () => {
//     setFilteredByPriority(true); // Pass the filter state to the parent component
//     setDropCardOpen(false);
//   };

//   return (
//     <nav className="navbar">
//       <div className="display-wrapper" onClick={toggleDropCard}>
//         <VscSettings className="nav-icon" />
//         Display
//         <BiChevronDown
//           className={`nav-down-icon ${isDropCardOpen ? "rotate-180" : ""}`}
//         />
//       </div>
//       {isDropCardOpen && (
//         <div className="drop-card">
//           <div className="filter">
//             <p>Grouping</p>
//             <div className="display-wrapper" onClick={toggleView}>
//               {showUsers ? "Status" : "Users"}{" "}
//               {/* Toggle between "Users" and "Status" */}
//               <BiChevronDown className="nav-down-icon" />
//             </div>
//           </div>
//           <div className="filter" onClick={filterByPriority}>
//             <p>Ordering</p>
//             <div className="display-wrapper">
//               Priority
//               <BiChevronDown className="nav-down-icon" />
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
