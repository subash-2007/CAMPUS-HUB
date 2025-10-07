
import React from 'react';

const iconProps = {
  className: "w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900",
  fill: "currentColor"
};

const activeIconProps = {
    ...iconProps,
    className: "w-6 h-6 text-white transition duration-75"
}

// A generic wrapper to handle active state for icons
const IconWrapper = ({ children, active }: { children: React.ReactNode, active?: boolean}) => {
    return React.cloneElement(children as React.ReactElement, active ? activeIconProps : iconProps);
}


export const HomeIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
  </IconWrapper>
);

export const CalendarIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
  </IconWrapper>
);

export const MapIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293A1 1 0 0016 6v10a1 1 0 00.293.707L20 20.414V7.586L17.707 5.293z" clipRule="evenodd"></path></svg>
  </IconWrapper>
);

export const ClipboardIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 1a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1H7z" clipRule="evenodd"></path></svg>
  </IconWrapper>
);

export const UserIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
  </IconWrapper>
);

export const LogoutIcon = () => (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);

export const UserGroupIcon = ({ active }: { active?: boolean }) => (
  <IconWrapper active={active}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 13.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM4.5 8.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM5.25 12a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM4.5 15.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zM18.75 17.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zM16.5 19.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM4.5 19.5a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM12 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V3.75A.75.75 0 0012 3z"></path></svg>
  </IconWrapper>
);

export const ChartBarIcon = ({ active }: { active?: boolean }) => (
    <IconWrapper active={active}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.75 3.375a.75.75 0 00-1.5 0V11.25H9.375a.75.75 0 000 1.5h1.875v7.875a.75.75 0 001.5 0V12.75h1.875a.75.75 0 000-1.5h-1.875V3.375z"></path><path fillRule="evenodd" d="M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zm-18 0a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd"></path></svg>
    </IconWrapper>
);
