import React from 'react';
import * as S from './platform-display-item.styled';

type PlatformDisplayItemProps = {
  icon: React.ReactElement;
  name: string;
};

export const PlatformDisplayItem = (props: PlatformDisplayItemProps) => {
  const { icon, name } = props;

  return (
    <S.Wrapper>
      {icon}
      <S.Typography variant="subtitle2">{name}</S.Typography>
    </S.Wrapper>
  );
};
