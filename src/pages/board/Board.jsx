import React, { useState } from "react";
import UserCard from "../../components/UserCard/UserCard";
import "./Board.css";
import Navbar from "../../components/Navbar/Navbar";
import TicketCard from "../../components/TicketCard/TicketCard";
import ProirityCard from "../../components/PriorityCard/ProirityCard";

const Board = () => {
  const [filteredByPriority, setFilteredByPriority] = useState(false);
  const [showUsers, setShowUsers] = useState(true);

  const toggleView = () => {
    setShowUsers((prevShowUsers) => !prevShowUsers);
  };

  return (
    <div className="board">
      <Navbar
        setFilteredByPriority={setFilteredByPriority}
        toggleView={toggleView}
        showUsers={showUsers}
      />
      {showUsers ? (
        <UserCard filteredByPriority={filteredByPriority} />
      ) : (
        <TicketCard />
      )}
      {/* <ProirityCard /> */}
    </div>
  );
};

export default Board;
