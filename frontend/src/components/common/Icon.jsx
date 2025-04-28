import React from 'react';
import { 
  FiHome, FiList, FiClipboard, FiCheckCircle, FiAlertCircle, 
  FiCalendar, FiUser, FiSettings, FiLogOut, FiBarChart2, 
  FiFolder, FiTag, FiEdit2, FiEye, FiTrash2, FiSearch,
  FiPlus, FiX, FiGrid, FiCheckSquare, FiClock, FiCamera,
  FiActivity, FiStar, FiAward, FiFlag, FiLayers, FiCoffee,
  FiBriefcase, FiCode, FiFileText, FiMail, FiMessageSquare,
  FiTrello, FiUsers, FiBell, FiHelpCircle, FiPlusCircle, 
  FiFolderPlus, FiInfo, FiArrowLeft, FiSend, 
  FiSliders
} from 'react-icons/fi';

const Icon = ({ name, size = '1em', color = 'currentColor', className = '' }) => {
  const iconMap = {
    'home': FiHome,
    'list': FiList,
    'clipboard': FiClipboard,
    'check-circle': FiCheckCircle,
    'alert-circle': FiAlertCircle,
    'calendar': FiCalendar,
    'user': FiUser,
    'settings': FiSettings,
    'log-out': FiLogOut,
    'bar-chart-2': FiBarChart2,
    'folder': FiFolder,
    'tag': FiTag,
    'edit-2': FiEdit2,
    'eye': FiEye,
    'trash-2': FiTrash2,
    'search': FiSearch,
    'plus': FiPlus,
    'x': FiX,
    'grid': FiGrid,
    'check-square': FiCheckSquare,
    'clock': FiClock,
    'camera': FiCamera,
    'activity': FiActivity,
    'star': FiStar,
    'award': FiAward,
    'flag': FiFlag,
    'layers': FiLayers,
    'coffee': FiCoffee,
    'briefcase': FiBriefcase,
    'code': FiCode,
    'file-text': FiFileText,
    'mail': FiMail,
    'message-square': FiMessageSquare,
    'trello': FiTrello,
    'users': FiUsers,
    'bell': FiBell,
    'help-circle': FiHelpCircle,
    'plus-circle': FiPlusCircle,
    'folder-plus': FiFolderPlus,
    'info': FiInfo,
    'arrow-left': FiArrowLeft,
    'send': FiSend,
    'sliders': FiSliders
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return <span className={`icon-fallback ${className}`}>{name || '?'}</span>;
  }

  return <IconComponent size={size} color={color} className={`icon ${className}`} />;
};

export default Icon;