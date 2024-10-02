import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import './main.css';

import TicketList from './components/ticketList/ticketList';
import NavigationBar from './components/navigationBar/navigationBar';

function Main() {
  // Status categories for tickets
  const statusList = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

  // Priority levels for tickets
  const priorityList = [
    { name: 'No priority', priority: 0 },
    { name: 'Urgent', priority: 4 },
    { name: 'High', priority: 3 },
    { name: 'Medium', priority: 2 },
    { name: 'Low', priority: 1 }
  ];

  // State for managing the selected grouping criteria ('status', 'user', 'priority')
  const [selectedGroup, setSelectedGroup] = useState(getGroupFromLocalStorage() || 'status');

  // State for managing ticket sorting order (either by 'priority' or 'title')
  const [selectedOrder, setSelectedOrder] = useState('title');

  // State for storing the list of tickets
  const [tickets, setTickets] = useState([]);

  // State for storing the list of user names (used for grouping by user)
  const [userNames, setUserNames] = useState([]);

  // Function to sort tickets based on the selected order (either by priority or title)
  const sortTickets = useCallback(async (ticketsArray) => {
    if (selectedOrder === 'priority') {
      // Sort by priority (higher priority comes first)
      ticketsArray.sort((a, b) => b.priority - a.priority);
    } else if (selectedOrder === 'title') {
      // Sort alphabetically by ticket title
      ticketsArray.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    }
    // Update the state with sorted tickets
    await setTickets(ticketsArray);
  }, [selectedOrder]);

  // Function to save the selected group (status/user/priority) to localStorage
  function saveGroupToLocalStorage(group) {
    localStorage.setItem('groupValue', JSON.stringify(group));
  }

  // Function to retrieve the selected group from localStorage
  function getGroupFromLocalStorage() {
    const storedGroup = localStorage.getItem('groupValue');
    return storedGroup ? JSON.parse(storedGroup) : null;
  }

  // Fetch tickets and users data from API and process them
  useEffect(() => {
    // Save the currently selected group to localStorage
    saveGroupToLocalStorage(selectedGroup);

    // Function to fetch and process ticket data
    const fetchAndTransformTickets = async () => {
      try {
        // Fetch ticket data from API
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');

        if (response.status === 200) {
          const { tickets, users } = response.data;

          // Combine tickets with their corresponding user information
          const ticketArray = tickets.map(ticket => {
            const user = users.find(user => user.id === ticket.userId);
            return { ...ticket, userObj: user }; // Combine user info with the ticket data
          });

          // Update state with combined ticket and user information
          setTickets(ticketArray);
          sortTickets(ticketArray);

          // Create a list of user names from the response
          const userNames = users.map(user => user.name);
          setUserNames(userNames);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    // Fetch and process ticket data on component load or when sort order/group changes
    fetchAndTransformTickets();
  }, [sortTickets, selectedGroup]);

  // Handler for changing the grouping (status, user, priority)
  function handleGroupSelection(value) {
    setSelectedGroup(value);
    console.log(value);
  }

  // Handler for changing the sorting order (title, priority)
  function handleOrderSelection(value) {
    setSelectedOrder(value);
    console.log(value);
  }

  return (
    <>
      {/* Navigation bar with controls for selecting grouping and sorting */}
      <NavigationBar
        groupValue={selectedGroup}
        orderValue={selectedOrder}
        handleGroupValue={handleGroupSelection}
        handleOrderValue={handleOrderSelection}
      />

      {/* Section displaying ticket lists */}
      <section className="board-details">
        <div className="board-details-list">
          {/* Conditional rendering based on the selected group */}
          {{
            // Group tickets by status
            'status': <>
              {statusList.map((listItem) => (
                <TicketList
                  key={listItem}
                  groupValue='status'
                  orderValue={selectedOrder}
                  listTitle={listItem}
                  listIcon=''
                  statusList={statusList}
                  ticketDetails={tickets}
                />
              ))}
            </>,
            // Group tickets by user
            'user': <>
              {userNames.map((listItem) => (
                <TicketList
                  key={listItem}
                  groupValue='user'
                  orderValue={selectedOrder}
                  listTitle={listItem}
                  listIcon=''
                  userList={userNames}
                  ticketDetails={tickets}
                />
              ))}
            </>,
            // Group tickets by priority
            'priority': <>
              {priorityList.map((listItem) => (
                <TicketList
                  key={listItem.priority}
                  groupValue='priority'
                  orderValue={selectedOrder}
                  listTitle={listItem.priority}
                  listIcon=''
                  priorityList={priorityList}
                  ticketDetails={tickets}
                />
              ))}
            </>
          }[selectedGroup]}
        </div>
      </section>
    </>
  );
}

export default Main;
