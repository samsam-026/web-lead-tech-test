import { describe, expect, it, vi } from 'vitest';

import { fireEvent, render } from '@testing-library/react';

import Tabs from './Tabs';

const tabs = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' }
];

describe('Tabs', () => {
  it('renders all tab labels', () => {
    const { getByText } = render(<Tabs tabs={tabs} activeTab="tab1" onTabChange={() => {}} />);
    tabs.forEach(tab => {
      expect(getByText(tab.label)).toBeInTheDocument();
    });
  });

  it('highlights the active tab', () => {
    const { getByText } = render(<Tabs tabs={tabs} activeTab="tab2" onTabChange={() => {}} />);
    const activeTab = getByText('Tab 2');
    expect(activeTab.className).toContain('border-b-primary');
    expect(activeTab.className).toContain('text-primary');
  });

  it('calls onTabChange when a tab is clicked', () => {
    const onTabChange = vi.fn();
    const { getByText } = render(<Tabs tabs={tabs} activeTab="tab1" onTabChange={onTabChange} />);
    fireEvent.click(getByText('Tab 3'));
    expect(onTabChange).toHaveBeenCalledWith('tab3');
  });

  it('does not call onTabChange when clicking the already active tab', () => {
    const onTabChange = vi.fn();
    const { getByText } = render(<Tabs tabs={tabs} activeTab="tab1" onTabChange={onTabChange} />);
    fireEvent.click(getByText('Tab 1'));
    expect(onTabChange).toHaveBeenCalledWith('tab1');
  });
});

// We recommend installing an extension to run vitest tests.
