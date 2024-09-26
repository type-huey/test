import styled from '@emotion/styled';
import { PLATFORM_NAME, PlatformNameUnion } from '~/shared/constants';

export const TaskItem = styled.li<{ $isLast: boolean }>`
  padding: 8px 16px;
  border-bottom: ${({ $isLast }) => ($isLast ? 'none' : '1px solid #ebebeb')};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Time = styled.div`
  font-size: 12px;
  color: #999;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Dot = styled.span<{ platform: PlatformNameUnion }>`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f00;
  background-color: ${({ platform }) => {
    switch (platform) {
      case PLATFORM_NAME.GOOGLE_CALENDAR:
        return '#2c65f8';
      case PLATFORM_NAME.GITLAB:
        return '#FF7F50';
      case PLATFORM_NAME.REDMINE:
        return '#F82C44';
      default:
        return '#999';
    }
  }};
`;

export const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;
