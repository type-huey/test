import * as React from 'react';
import { debounce } from 'lodash-es';
import InputAdornment from '@mui/material/InputAdornment';

import { useControlled } from '~/shared/hooks';
import { composeRef } from '~/shared/utils';

import { PLATFORM_TOKEN_STATUS, PlatformTokenStatusUnion } from '~/shared/constants/platform';

import * as S from './platform-token-field.styled';
import type { PlatformTokenFieldProps } from './platform-token-field.types';
import { PlatformTokenStatusIcon } from './platform-token-status-icon';

export const PlatformTokenField = React.forwardRef(function PlatformTokenField(
  props: PlatformTokenFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const {
    id: idProp,
    name,
    labelText,
    placeholder,
    tokenStatus: tokenStatusProp = PLATFORM_TOKEN_STATUS.NONE,
    value: valueProp,
    defaultValue,
    authenticate,
    onChange,
    onVerify,
  } = props;

  const [tokenStatus, setTokenStatus] = React.useState<PlatformTokenStatusUnion>(tokenStatusProp);
  const [checking, setChecking] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const prevIsTyping = React.useRef(false);
  const typingTimeout = React.useRef<null | NodeJS.Timeout>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    defaultValue: defaultValue,
  });
  const composedInputRef = composeRef(inputRef, ref);

  const defaultId = React.useId();
  const id = idProp ?? defaultId;

  // 토큰값 변경
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValue(value);
    setChecking(value.trim().length > 0);
    onChange?.(event, value);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      setIsTyping(false);
      typingTimeout.current = null;
    }, 1000);
  };

  // 토큰값 인증
  const handleVerify = debounce(async () => {
    if (authenticate) {
      const isAuthenticated = await authenticate(value);
      const tokenStatus = isAuthenticated ? PLATFORM_TOKEN_STATUS.AUTHENTICATED : PLATFORM_TOKEN_STATUS.UNAUTHENTICATED;

      setTokenStatus(tokenStatus);
      onVerify?.(value, tokenStatus);
    }

    setChecking(false);
  }, 250);

  // 언마운트 typing 초기화
  React.useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  // 토큰값 없을때 checking, authStatus 초기화
  React.useEffect(() => {
    if (!value) {
      setChecking(false);
      setTokenStatus(PLATFORM_TOKEN_STATUS.NONE);
    }
  }, [value]);

  // typing 완료 -> 토큰값 인증
  React.useEffect(() => {
    if (prevIsTyping.current && !isTyping) {
      if (value) {
        handleVerify();
      } else {
        onVerify?.('', PLATFORM_TOKEN_STATUS.NONE);
      }
      prevIsTyping.current = false;
    }

    return () => {
      prevIsTyping.current = isTyping;
    };
  }, [onVerify, handleVerify, isTyping, value]);

  return (
    <S.Wrapper>
      {labelText && (
        <S.InputLabel sx={{ fontSize: '0.875rem' }} htmlFor={id}>
          {labelText}
        </S.InputLabel>
      )}
      <S.TextField
        fullWidth
        size="small"
        variant="outlined"
        autoComplete="off"
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PlatformTokenStatusIcon checking={checking} status={tokenStatus} />
            </InputAdornment>
          ),
        }}
        id={id}
        name={name}
        inputRef={composedInputRef}
        value={value}
        onChange={handleChange}
      />
    </S.Wrapper>
  );
});
