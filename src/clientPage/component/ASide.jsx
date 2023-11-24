import React from 'react';

const ASide = ({ isSideBarOpen, openSideBar }) => {
  const sidebarClass = `fixed inset-y-0 right-0 w-64 bg-red-700 text-white p-4 transition-transform duration-300 ease-in-out transform ${
    isSideBarOpen ? 'translate-x-0' : 'translate-x-full'
  }`;

  return (
    <div className={sidebarClass}>
      {/* Sidebar content */}
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
      </ul>
      {/* Close button */}
      <button onClick={openSideBar}>Close Sidebar</button>
    </div>
  );
};

export default ASide;
