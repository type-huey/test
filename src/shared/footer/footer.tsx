import { useEffect, useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

import * as S from './styled';
import { usePanelStateStore } from '../store';
import { TPanelType } from '../constants';

interface FooterProps {
  type: TPanelType;
}

export const Footer = ({ type }: FooterProps) => {
  const [selectedIcon, setSelectedIcon] = useState(type);
  const { setMainPanelState } = usePanelStateStore((state) => ({
    mainPanelState: state.mainPanelState,
    setMainPanelState: state.setMainPanelState,
  }));

  useEffect(() => {
    selectedIcon === 'main' && setMainPanelState('main');
    selectedIcon === 'calendar' && setMainPanelState('calendar');
    selectedIcon === 'setting' && setMainPanelState('setting');
  }, [selectedIcon]);

  return (
    <S.Footer>
      <S.FooterIconWrapper onClick={() => setSelectedIcon('main')} isSelect={selectedIcon === 'main'}>
        <HomeOutlinedIcon sx={{ fill: selectedIcon === 'main' ? '#FA3F3F' : '#818181' }} />
      </S.FooterIconWrapper>
      <S.FooterIconWrapper onClick={() => setSelectedIcon('calendar')} isSelect={selectedIcon === 'calendar'}>
        <CalendarMonthIcon sx={{ fill: selectedIcon === 'calendar' ? '#FA3F3F' : '#818181' }} />
      </S.FooterIconWrapper>
      <S.FooterIconWrapper onClick={() => setSelectedIcon('setting')} isSelect={selectedIcon === 'setting'}>
        <SettingsIcon sx={{ fill: selectedIcon === 'setting' ? '#FA3F3F' : '#818181' }} />
      </S.FooterIconWrapper>
    </S.Footer>
  );
};
