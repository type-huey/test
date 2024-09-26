// User 타입 정의
export interface User {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: string; // ISO date format (string)
  updated_on: string; // ISO date format (string)
  last_login_on: string | null; // 로그인 날짜는 null일 수 있으므로 nullable
  passwd_changed_on: string | null; // 비밀번호 변경 날짜는 null일 수 있음
  api_key: string;
  avatar_url: string | null; // avatar_url은 빈 문자열이므로 nullable로 처리
  status: number;
  custom_fields: CustomField[]; // Custom fields 배열
  memberships: Membership[]; // Memberships 배열
  groups: Group[]; // Groups 배열
}

// CustomField 타입 정의 (현재 데이터에 없지만 타입만 선언)
export interface CustomField {
  // 필드가 없으므로 미리 정의할 수 있지만, 향후 사용 가능
  [key: string]: any;
}

// Membership 타입 정의
export interface Membership {
  project: Project;
  roles: Role[];
}

// Project 타입 정의
export interface Project {
  id: number;
  name: string;
}

// Role 타입 정의
export interface Role {
  id: number;
  name: string;
}

// Group 타입 정의
export interface Group {
  id: number;
  name: string;
}

// 전체 API 응답 타입
export interface UserResponse {
  user: User;
}
