import * as React from 'react';

export interface UseControlledProps<T = unknown> {
  /**
   * 제어될 때 구성요소 값을 보유합니다.
   */
  controlled?: T;
  /**
   * 제어되지 않은 경우 기본값입니다.
   */
  defaultValue?: T;
}

/**
 * 프로퍼티(controlled)가 전달되면 해당 프로퍼티 값을 사용하고,
 * 그렇지 않으면 useState로 내부의 상태를 사용하는 훅
 */
export const useControlled = <T = unknown>(props: UseControlledProps<T>) => {
  const { controlled, defaultValue } = props;

  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValueState] = React.useState(defaultValue);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = React.useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setValueState(newValue);
      }
    },
    [isControlled]
  );

  return [value as T, setValueIfUncontrolled] as const;
};
