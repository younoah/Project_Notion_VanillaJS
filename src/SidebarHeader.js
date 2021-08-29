import AddDocButton from './AddDocButton.js';
import UserName from './UserName.js';

export default function SidebarHeader({$target, onClick}) {
  const $sidebarHeader= document.createElement('div');
  $sidebarHeader.className = 'sidebar-header'
  $target.appendChild($sidebarHeader);
  
  new UserName({
    $target : $sidebarHeader,
    initialState : '김영후'
  })

  new AddDocButton({
    $target : $sidebarHeader,
    initialState : 'New Doc',
    onClick,
  })
}