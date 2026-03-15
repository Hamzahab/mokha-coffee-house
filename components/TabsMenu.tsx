'use client';

import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  reserve?: boolean;
  content: ReactNode;
}

export function TabsMenu({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');

  return (
    <>
      <div className="tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn${tab.reserve ? ' reserve-tab' : ''}${active === tab.id ? ' active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="menu-body">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`menu-panel${active === tab.id ? ' active' : ''}`}
            id={`panel-${tab.id}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
}
