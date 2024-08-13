"use client";
import { useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 1);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="bg-white mt-6 p-6">
      <ul className="flex max-sm:overflow-scroll text-sm font-medium border-b text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onClick={handleTabClick}
          />
        ))}
      </ul>
      <div className="mt-4 bg-white">
        {activeTabContent}
      </div>
    </div>
  );
};


const TabButton = ({ tab, isActive, onClick }) => (
  <li className="me-2">
    <button
      onClick={() => onClick(tab.id)}
      className={`inline-block px-6 py-4 ${
        isActive
          ? "text-tert-100 bg-gray-100 border-x border-t border-b-white"
          : "hover:text-gray-600 hover:bg-gray-50"
      } dark:hover:bg-gray-800 dark:hover:text-gray-300 focus:outline-none`}
      disabled={tab.disabled}
    >
      {tab.label}
    </button>
  </li>
);

export default Tabs;
