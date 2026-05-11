import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, className = '', style }: IconProps) {
  if (name.startsWith('fa-')) {
    return (
      <i className={`fa-brands ${name} ${className}`} style={style}></i>
    );
  }
  return (
    <i className={`bx ${name} ${className}`} style={style}></i>
  );
}
