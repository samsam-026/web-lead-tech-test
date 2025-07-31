import * as React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative h-full w-full overflow-hidden rounded-lg border-[#cfcfcf]">{children}</div>;
};

export default Container;
