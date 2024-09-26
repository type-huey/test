// User 타입 정의
export interface User {
  name: string; // 사용자 이름
  id: number; // 사용자 ID
}

// Detail 타입 정의
export interface Detail {
  property: string; // 속성 이름
  name: string; // 속성 이름
  old_value: string; // 이전 값
  new_value: string; // 새로운 값
}

// Journal 타입 정의
export interface Journal {
  id: number; // 저널 ID
  user: User; // 사용자 정보
  notes: string; // 노트 (내용)
  created_on: string; // 생성 날짜
  details: Detail[]; // 세부사항 배열
}

// Issue 타입 정의
export interface Issue {
  id: number; // 이슈 ID
  project: {
    // 프로젝트 정보
    name: string; // 프로젝트 이름
    id: number; // 프로젝트 ID
  };
  tracker: {
    // 트래커 정보
    name: string; // 트래커 이름
    id: number; // 트래커 ID
  };
  journals: Journal[]; // 저널 배열
}

// 전체 응답 타입 정의
export interface IssueResponse {
  issue: Issue; // 이슈 정보
}
