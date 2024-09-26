export type State = {
  googleCalendarList: any[];
};

export type Actions = {
  setGoogleCalendar: (calendarList: any) => void;
};

export interface CredentialResponse {
  access_token: string;
  authuser: string;
  expires_in: number;
  hd: string;
  prompt: string;
  scope: string;
  token_type: string;
}

export interface IGoogleCalendarDate {
  startDate: Date;
  endDate: Date;
}

export interface IResponseGoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
}
