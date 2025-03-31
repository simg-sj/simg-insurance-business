import React, { useState } from 'react';
import { TabProps } from '@/@types/common';

export const Tab = ({
                        options,
                        initialTab,
                        onTabChange,
                        className = '',
                    }: TabProps) => {
    const [activeTab, setActiveTab] = useState(initialTab || options[0].id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        onTabChange(tabId);
    };

    return (
        <div className={`tabwrap flex items-center gap-10 mt-20 ${className}`}>
            {options.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`text-2xl ${
                        activeTab === tab.id
                            ? 'font-medium text-m-bluegray'
                            : 'text-gray-600 hover:text-m-bluegray'
                    } text-center mb-20 cursor-pointer transition-colors duration-200`}
                >
                    {tab.label}
                </div>
            ))}
        </div>
    );
};