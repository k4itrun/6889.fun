'use client';

import { ReactNode, useEffect, useState } from 'react';
import { KeyShortcut } from '@/components/Cursor/KeyShortcut';
import { Icons } from '@/components/UI/Icons';

interface EventActions {
 hasForward: boolean;
 hasBack: boolean;
 goBack: () => void;
 goForward: () => void;
 refreshPage: () => void;
 viewGithub: () => void;
 viewYoutube: () => void;
}

interface ItemProps extends React.ComponentPropsWithRef<'div'> {
 icon?: ReactNode;
 text: string;
 kbd?: string[];
 onClick?: () => void;
}

export const MenuItem = ({ ref, icon, text, kbd, onClick, ...props }: ItemProps) => {
 return (
  <div
   ref={ref}
   className="flex flex-col text-sm"
   onClick={onClick}
   {...props}
  >
   <div className="flex w-full items-center justify-between gap-2 p-2 px-4 transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5">
    <div className="flex items-center gap-2">
     {icon}
     <p>{text}</p>
    </div>
    {kbd && <KeyShortcut keys={kbd} />}
   </div>
  </div>
 );
};

const renderContextMenu = ({ hasBack, hasForward, goBack, goForward, refreshPage, viewGithub, viewYoutube }: EventActions) => {
 const renderMenuItem = (icon: ReactNode, text: string, onClick: () => void, kbd: string[] = []) => (
  <>
   <MenuItem
    icon={icon}
    text={text}
    onClick={onClick}
    {...(kbd.length > 0 ? { kbd } : {})}
   />
  </>
 );

 return (
  <>
   <div>
    {hasBack && renderMenuItem(<Icons.ArrowLeft className="h-5 w-5 fill-neutral-700/50 transition-all duration-200 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white" />, 'Back', goBack, ['Alt', '◀'])}
    {hasForward && renderMenuItem(<Icons.ArrowRight className="h-5 w-5 fill-neutral-700/50 transition-all duration-200 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white" />, 'Forward', goForward, ['Alt', '▶'])}
    {renderMenuItem(<Icons.Redo className="h-5 w-5 fill-neutral-700/50 transition-all duration-200 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white" />, 'Refresh', refreshPage, ['Ctrl', 'R'])}
   </div>
   <div className="pt-3">
    {renderMenuItem(<Icons.Github className="h-4 w-4 fill-neutral-700/50 transition-all duration-200 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white" />, 'Github', viewGithub)}
    {renderMenuItem(<Icons.Youtube className="h-4 w-4 fill-neutral-700/50 transition-all duration-200 hover:fill-neutral-700 dark:fill-white/50 dark:hover:fill-white" />, 'YouTube', viewYoutube)}
   </div>
  </>
 );
};

export const ContextMenu = ({ children }: { children: ReactNode }) => {
 const [isBackEnabled, setIsBackEnabled] = useState(false);
 const [isForwardEnabled, setIsForwardEnabled] = useState(false);

 useEffect(() => {
  const handleContextMenu = (event: MouseEvent) => {
   event.preventDefault();
   const menu = document.querySelector('.context-menu') as HTMLElement;
   const { pageX: x, pageY: y } = event;
   const { innerWidth: windowWidth, innerHeight: _windowHeight } = window;

   if (menu) {
    menu.style.left = x + menu.offsetWidth > windowWidth ? `${windowWidth - menu.offsetWidth - 24}px` : `${x}px`;
    menu.style.top = `${y}px`;
    menu.style.display = 'block';
   }
  };

  const handleClickOutside = () => {
   const menu = document.querySelector('.context-menu') as HTMLElement;
   if (menu) menu.style.display = 'none';
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('click', handleClickOutside);

  return () => {
   document.removeEventListener('contextmenu', handleContextMenu);
   document.removeEventListener('click', handleClickOutside);
  };
 }, []);

 useEffect(() => {
  const hasHistory = window.history.length > 1;
  setIsBackEnabled(hasHistory);
  setIsForwardEnabled(hasHistory);
 }, []);

 const actions: EventActions = {
  hasForward: isForwardEnabled,
  hasBack: isBackEnabled,
  goBack: () => window.history.back(),
  goForward: () => window.history.forward(),
  refreshPage: () => window.location.reload(),
  viewGithub: () => window.open('https://github.com/k4itrun/', '_blank'),
  viewYoutube: () => window.open('https://youtube.com/channel/UCa6sR_p87T0kB4FdvOJiVjw', '_blank'),
 };

 return (
  <>
   <div
    className="context-menu absolute w-72 space-y-2 divide-y divide-gray-600/10 rounded-lg bg-white py-2 shadow-xl dark:bg-black"
    style={{
     display: 'none',
     zIndex: 9 * 10000,
    }}
   >
    {renderContextMenu(actions)}
   </div>
   {children}
  </>
 );
};
