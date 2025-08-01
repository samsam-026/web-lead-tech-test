import * as React from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="relative h-full w-full overflow-hidden rounded-lg border-secondary">{children}</div>;
};

export default Container;
