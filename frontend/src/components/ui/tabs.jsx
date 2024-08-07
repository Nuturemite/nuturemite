import React, { useState } from 'react';

// Independent Tabs component
const Tabs = ({ tabs }) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 1);

  // Handler to switch tabs
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white mt-6 p-6">
      {/* Tab Navigation */}
      <ul className="flex flex-wrap text-sm font-medium border-b text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map((tab) => (
          <li key={tab.id} className="me-2">
            <button
              onClick={() => handleTabClick(tab.id)}
              className={`inline-block px-6 py-4 ${
                activeTab === tab.id
                  ? "text-primary bg-gray-100 border-x border-t border-b-white"
                  : "hover:text-gray-600 hover:bg-gray-50"
              } dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none`}
              disabled={tab.disabled}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Tab Content */}
      <div className="mt-4 bg-white">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
