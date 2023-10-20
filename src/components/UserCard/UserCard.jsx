import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserCard.css";
import usericon from "../../images/usericon.png";
import { GoDotFill, GoDot } from "react-icons/go";
import { AiOutlineDash } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel, MdPending } from "react-icons/md";

const UserCard = ({ filteredByPriority, setUserCards }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        // const userData = response.data;
        const userData = response.data.tickets;
        setUser(userData);
        // console.log("userData", userData);
        // Set user cards to the parent component
        setUserCards(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const groupUsersByStatus = () => {
    if (user) {
      const groupedUsers = {
        Todo: [],
        "In Progress": [],
        Done: [],
        Backlog: [],
        Canceled: [],
      };

      user.forEach((carduser) => {
        if (groupedUsers[carduser.status]) {
          groupedUsers[carduser.status].push(carduser);
        }
      });

      return groupedUsers;
    }

    return null;
  };

  return (
    <div className="user-cards">
      {user ? (
        Object.entries(groupUsersByStatus()).map(([status, users]) => (
          <div key={status} className="user-card-section">
            <p className="user-card-status">
              <div className="status-left-wrapper">
                {status === "In Progress" ? (
                  <TbProgress className="status-icon" />
                ) : status === "Done" ? (
                  <IoCheckmarkDoneCircleSharp className="status-icon" />
                ) : status === "Backlog" ? (
                  <MdPending className="status-icon" />
                ) : status === "Canceled" ? (
                  <MdCancel className="status-icon" />
                ) : (
                  <GoDot className="status-icon" />
                )}
                {status} {users.length} {/* Display the number of cards */}
              </div>
              <div>
                <BiDotsHorizontalRounded className="status-right-icon" />
                <BsPlus className="status-right-icon" />
              </div>
            </p>

            {users.map((carduser) => (
              <div key={carduser.id} className="user-card">
                <div className="id-wrapper">
                  <p className="user-card-id">{carduser.id}</p>
                  <img src={usericon} alt="" />
                </div>

                <p className="user-card-title">{carduser.title}</p>
                <div className="main-tag-wrapper">
                  <AiOutlineDash className="dashed-icon" />
                  <div className="tag-wrapper">
                    <GoDotFill className="icon" />
                    <p className="user-card-tag">{carduser.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserCard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./UserCard.css";
// import usericon from "../../images/usericon.png";
// import { GoDotFill, GoDot } from "react-icons/go";
// import { AiOutlineDash } from "react-icons/ai";
// import { BsPlus } from "react-icons/bs";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { TbProgress } from "react-icons/tb";
// import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
// import { MdCancel, MdPending } from "react-icons/md";

// const UserCard = ({ filteredByPriority, setUserCards }) => {
//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.quicksell.co/v1/internal/frontend-assignment"
//         );
//         const userData = response.data.tickets;
//         setUser(userData);
//         // Set user cards to parent component
//         setUserCards(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (filteredByPriority) {
//       const sortedUser = [...user].sort((a, b) => b.priority - a.priority);

//       // Update the user state with sorted results
//       setUser(sortedUser);
//     }
//   }, [filteredByPriority]);

//   const groupUsersByStatus = () => {
//     if (user) {
//       const groupedUsers = {
//         Todo: [],
//         "In Progress": [],
//         Done: [],
//         Backlog: [],
//         Canceled: [],
//       };

//       user.forEach((carduser) => {
//         if (groupedUsers[carduser.status]) {
//           groupedUsers[carduser.status].push(carduser);
//         }
//       });

//       return groupedUsers;
//     }

//     return null;
//   };

//   return (
//     <div className="user-cards">
//       {user ? (
//         Object.entries(groupUsersByStatus()).map(([status, users]) => (
//           <div key={status} className="user-card-section">
//             <p className="user-card-status">
//               <div className="status-left-wrapper">
//                 {status === "In Progress" ? (
//                   <TbProgress className="status-icon" />
//                 ) : status === "Done" ? (
//                   <IoCheckmarkDoneCircleSharp className="status-icon" />
//                 ) : status === "Backlog" ? (
//                   <MdPending className="status-icon" />
//                 ) : status === "Canceled" ? (
//                   <MdCancel className="status-icon" />
//                 ) : (
//                   <GoDot className="status-icon" />
//                 )}
//                 {status}
//               </div>
//               <div>
//                 <BiDotsHorizontalRounded className="status-right-icon" />
//                 <BsPlus className="status-right-icon" />
//               </div>
//             </p>

//             {users.map((carduser) => (
//               <div key={carduser.id} className="user-card">
//                 <div className="id-wrapper">
//                   <p className="user-card-id">{carduser.id}</p>
//                   <img src={usericon} alt="" />
//                 </div>
//                 <p className="user-card-title">{carduser.title}</p>
//                 <div className="main-tag-wrapper">
//                   <AiOutlineDash className="dashed-icon" />
//                   <div className="tag-wrapper">
//                     <GoDotFill className="icon" />
//                     <p className="user-card-tag">{carduser.tag}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserCard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./UserCard.css";
// import usericon from "../../images/usericon.png";
// import { GoDotFill, GoDot } from "react-icons/go";
// import { AiOutlineDash } from "react-icons/ai";
// import { BsPlus } from "react-icons/bs";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { TbProgress } from "react-icons/tb";
// import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
// import { MdCancel, MdPending } from "react-icons/md";

// const UserCard = ({ filteredByPriority }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.quicksell.co/v1/internal/frontend-assignment"
//         );
//         const userData = response.data.tickets;
//         setUser(userData);
//         console.log(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (filteredByPriority) {
//       const sortedUser = [...user].sort((a, b) => b.priority - a.priority);

//       // Update the user state with sorted results
//       setUser(sortedUser);
//     }
//   }, [filteredByPriority]);

//   const groupUsersByStatus = () => {
//     if (user) {
//       const groupedUsers = {
//         Todo: [],
//         "In Progress": [],
//         Done: [],
//         Backlog: [],
//         Canceled: [],
//       };

//       user.forEach((carduser) => {
//         if (groupedUsers[carduser.status]) {
//           groupedUsers[carduser.status].push(carduser);
//         }
//       });

//       return groupedUsers;
//     }

//     return null;
//   };

//   return (
//     <div className="user-cards">
//       {user ? (
//         Object.entries(groupUsersByStatus()).map(([status, users]) => (
//           <div key={status} className="user-card-section">
//             <p className="user-card-status">
//               <div className="status-left-wrapper">
//                 {status === "In Progress" ? (
//                   <TbProgress className="status-icon" />
//                 ) : status === "Done" ? (
//                   <IoCheckmarkDoneCircleSharp className="status-icon" />
//                 ) : status === "Backlog" ? (
//                   <MdPending className="status-icon" />
//                 ) : status === "Canceled" ? (
//                   <MdCancel className="status-icon" />
//                 ) : (
//                   <GoDot className="status-icon" />
//                 )}
//                 {status}
//               </div>
//               <div>
//                 <BiDotsHorizontalRounded className="status-right-icon" />
//                 <BsPlus className="status-right-icon" />
//               </div>
//             </p>

//             {users.map((carduser) => (
//               <div key={carduser.id} className="user-card">
//                 <div className="id-wrapper">
//                   <p className="user-card-id">{carduser.id}</p>
//                   <img src={usericon} alt="" />
//                 </div>
//                 <p className="user-card-title">{carduser.title}</p>
//                 <div className="main-tag-wrapper">
//                   <AiOutlineDash className="dashed-icon" />
//                   <div className="tag-wrapper">
//                     <GoDotFill className="icon" />
//                     <p className="user-card-tag">{carduser.tag}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserCard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./UserCard.css";
// import usericon from "../../images/usericon.png";
// import { GoDotFill, GoDot } from "react-icons/go";
// import { AiOutlineDash } from "react-icons/ai";
// import { BsPlus } from "react-icons/bs";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { TbProgress } from "react-icons/tb";
// import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
// import { MdCancel, MdPending } from "react-icons/md";

// const UserCard = ({ filteredByPriority }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.quicksell.co/v1/internal/frontend-assignment"
//         );
//         const userData = response.data.tickets;
//         setUser(userData);
//         console.log(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (filteredByPriority) {
//       const sortedUser = [...user].sort((a, b) => b.priority - a.priority);

//       // Update the user state with sorted results
//       setUser(sortedUser);
//     }
//   }, [filteredByPriority]);

//   const groupUsersByStatus = () => {
//     if (user) {
//       const groupedUsers = {
//         Todo: [],
//         "In Progress": [],
//         Done: [],
//         Backlog: [],
//         Canceled: [],
//       };

//       user.forEach((carduser) => {
//         if (groupedUsers[carduser.status]) {
//           groupedUsers[carduser.status].push(carduser);
//         }
//       });

//       return groupedUsers;
//     }

//     return null;
//   };

//   return (
//     <div className="user-cards">
//       {user ? (
//         Object.entries(groupUsersByStatus()).map(([status, users]) => (
//           <div key={status} className="user-card-section">
//             <p className="user-card-status">
//               <div className="status-left-wrapper">
//                 {status === "In Progress" ? (
//                   <TbProgress className="status-icon" />
//                 ) : status === "Done" ? (
//                   <IoCheckmarkDoneCircleSharp className="status-icon" />
//                 ) : status === "Backlog" ? (
//                   <MdPending className="status-icon" />
//                 ) : status === "Canceled" ? (
//                   <MdCancel className="status-icon" />
//                 ) : (
//                   <GoDot className="status-icon" />
//                 )}
//                 {status}
//               </div>
//               <div>
//                 <BiDotsHorizontalRounded className="status-right-icon" />
//                 <BsPlus className="status-right-icon" />
//               </div>
//             </p>

//             {users.map((carduser) => (
//               <div key={carduser.id} className="user-card">
//                 <div className="id-wrapper">
//                   <p className="user-card-id">{carduser.id}</p>
//                   <img src={usericon} alt="" />
//                 </div>
//                 <p className="user-card-title">{carduser.title}</p>
//                 <div className="main-tag-wrapper">
//                   <AiOutlineDash className="dashed-icon" />
//                   <div className="tag-wrapper">
//                     <GoDotFill className="icon" />
//                     <p className="user-card-tag">{carduser.tag}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// };

// export default UserCard;
