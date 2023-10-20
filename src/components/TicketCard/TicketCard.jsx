import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TicketCard.css";
import { BsPlus } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import usericon from "../../images/usericon.png";

import { GoDotFill, GoDot } from "react-icons/go";
import { AiOutlineDash } from "react-icons/ai";
import { TbProgress } from "react-icons/tb";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { MdCancel, MdPending } from "react-icons/md";

const TicketCard = () => {
  const [tickets, setTickets] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const ticketData = response.data.tickets;
        setTickets(ticketData);

        const userData = response.data.users.reduce((acc, user) => {
          acc[user.id] = user.name;
          return acc;
        }, {});

        setUserNames(userData);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, []);

  const groupTicketsByUser = () => {
    if (tickets) {
      const groupedTickets = {};

      tickets.forEach((ticket) => {
        const userName = userNames[ticket.userId];
        if (!groupedTickets[userName]) {
          groupedTickets[userName] = [];
        }
        groupedTickets[userName].push(ticket);
      });

      return groupedTickets;
    }

    return null;
  };

  return (
    <div className="ticket-cards">
      {tickets ? (
        Object.entries(groupTicketsByUser()).map(([userName, userTickets]) => (
          <div key={userName} className="user-ticket-section">
            <div className="name-wrapper">
              <img src={usericon} alt="" />
              <p className="user-ticket-user-name">
                {userName} {userTickets.length} {/* Display the count */}
                <div>
                  <BiDotsHorizontalRounded className="status-right-icon" />
                  <BsPlus className="status-right-icon" />
                </div>
              </p>
            </div>
            {userTickets.map((ticket) => (
              <div key={ticket.id} className="user-ticket-card">
                <h3 className="user-ticket-id">{ticket.id}</h3>
                <h3 className="user-ticket-title">{ticket.title}</h3>
                <div className="main-tag-wrapper">
                  <AiOutlineDash className="dashed-icon" />
                  <div className="tag-wrapper">
                    <GoDotFill className="icon" />
                    <p className="user-card-tag">{ticket.tag}</p>
                  </div>
                </div>
                {/* Add more ticket information here */}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading ticket data...</p>
      )}
    </div>
  );
};

export default TicketCard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./TicketCard.css";

// const TicketCard = ({ userId, onTaskMove }) => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://api.quicksell.co/v1/internal/frontend-assignment"
//         );
//         const ticketData = response.data.tickets;
//         setTickets(ticketData);
//       } catch (error) {
//         console.error("Error fetching ticket data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const groupTicketsByUser = () => {
//     if (tickets) {
//       const groupedTickets = {};

//       tickets.forEach((ticket) => {
//         const userName = ticket.userId; // Assuming userId corresponds to the user's name
//         if (!groupedTickets[userName]) {
//           groupedTickets[userName] = [];
//         }
//         groupedTickets[userName].push(ticket);
//       });

//       return groupedTickets;
//     }

//     return null;
//   };

//   return (
//     <div className="ticket-cards">
//       {tickets ? (
//         Object.entries(groupTicketsByUser()).map(([userName, userTickets]) => (
//           <div key={userName} className="user-ticket-section">
//             <h2 className="user-ticket-user-name">{userName}</h2>
//             {userTickets.map((ticket) => (
//               <div key={ticket.id} className="user-ticket-card">
//                 <h3 className="user-ticket-title">{ticket.title}</h3>
//                 <h5 className="user-ticket-status">{ticket.status}</h5>
//                 {/* Add more ticket information here */}
//               </div>
//             ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading ticket data...</p>
//       )}
//     </div>
//   );
// };

// export default TicketCard;
