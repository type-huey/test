import { IconProps } from './Icons.type';
import { Refresh } from './task/Refresh';
import { GoogleCalendarLogo } from './google-calendar';
import { GitLabLogo } from './gitlab';
import { RedmineLogo } from './redmine';
import { GoogleLogo } from './google';
import { WriteDailyLogo } from './write-daily';

export const TemplateIcon = ({ width, height, fill, viewBox, d }: IconProps) => {
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={d} fill={fill} />
    </svg>
  );
};

export const Icon = {
  Refresh,
  GoogleCalendarLogo,
  GitLabLogo,
  RedmineLogo,
  GoogleLogo,
  WriteDailyLogo,
};
