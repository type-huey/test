import type { PlatformTokenStatusUnion } from '~/shared/constants/platform';

export interface PlatformTokenFieldProps {
  /**
   * 둘러싸는 레이블 요소에 사용할 텍스트 속성
   */
  labelText?: string;
  /**
   * `input` 구성 요소의 임시로 채워 놓는 텍스트 속성
   */
  placeholder?: string;
  /**
   * `input` 구성 요소의 `id` 속성
   */
  id?: string;
  /**
   * `input` 구성 요소의 `name` 속성
   */
  name?: string;
  /**
   * 기본 값. 비제어 컴포넌트일때 사용합니다.
   */
  defaultValue?: string;
  /**
   * 구성 요소의 값 속성
   */
  value?: string;
  /**
   * 기본 토큰값 인증 상태
   * @default 'none'
   */
  tokenStatus?: PlatformTokenStatusUnion;
  /**
   * 토큰값을 인증하는 콜백함수
   */
  authenticate?: (value: string) => boolean | Promise<boolean>;
  /**
   * 값이 변경되면 호출할 콜백함수
   */
  onChange?: (e: React.SyntheticEvent, value: string) => void;
  /**
   * 토큰값의 인증 처리시 호출되는 콜백함수
   */
  onVerify?: (value: string, tokenStatus: PlatformTokenStatusUnion) => void;
}
