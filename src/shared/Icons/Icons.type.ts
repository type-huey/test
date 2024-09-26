import { ComponentPropsWithoutRef } from 'react';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  width?: string;
  height?: string;
  viewBox?: string;
  fill?: string;
}
