// CustomField 타입 정의
export interface CustomField {
  name: string; // 커스텀 필드 이름
  id: number; // 커스텀 필드 ID
  value: string | number; // 값 (string 또는 number)
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
  status: {
    // 상태 정보
    name: string; // 상태 이름
    id: number; // 상태 ID
  };
  priority: {
    // 우선순위 정보
    name: string; // 우선순위 이름
    id: number; // 우선순위 ID
  };
  author: {
    // 작성자 정보
    name: string; // 작성자 이름
    id: number; // 작성자 ID
  };
  category: {
    // 카테고리 정보
    name: string; // 카테고리 이름
    id: number; // 카테고리 ID
  };
  subject: string; // 이슈 제목
  description: string; // 이슈 설명
  start_date: string; // 시작 날짜
  due_date: string | null; // 마감 날짜 (nullable)
  done_ratio: number; // 완료 비율
  estimated_hours: number | null; // 예상 시간 (nullable)
  custom_fields: CustomField[]; // 커스텀 필드 배열
  created_on: string; // 생성 날짜
  updated_on: string; // 수정 날짜
}

// Issues 타입 정의
export interface IssuesResponse {
  type: 'array'; // 타입 (항상 'array')
  count: number; // 이슈 개수
  issues: Issue[]; // 이슈 배열
}
