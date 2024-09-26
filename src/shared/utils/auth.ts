import Cookies from 'universal-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const cookies = new Cookies();
export const getCookieOption = () => {
  return window.location.hostname === 'localhost'
    ? { doNotUpdate: false }
    : {
        domain: window.location.hostname,
        secure: true,
        sameSite: true,
      };
};
export const setCookie = (key: string, value: string) => {
  cookies.set(key, value, getCookieOption());
};
export const getCookie = (key: string) => {
  return cookies?.get(key, getCookieOption()) || null;
};

/**
 * JWT 토큰이 만료되었는지 확인하는 유틸리티 함수
 * @author shhan
 * @date 12/08/2024
 * @param {string} token - JWT 토큰
 * @returns {boolean} - 토큰 만료 여부
 */
export const isJwtExpired = (token: string | undefined): boolean => {
  try {
    if (!token) return true;
    const decodedToken = jwt.decode(token, { complete: true }) as JwtPayload;

    if (!decodedToken || !decodedToken.payload || !decodedToken.payload.exp) {
      throw new Error("The token does not have an 'exp'.");
    }

    const exp = decodedToken.payload.exp;
    const now = Math.floor(Date.now() / 1000);

    return now > exp;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
