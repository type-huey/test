import ky from 'ky';
import { IGoogleCalendarDate, IResponseGoogleCalendarEvent } from '../model/google-calendar.types';
import { GOOGLE_API_BASE_URL } from '../lib/google-calendar.constant';

const googleApiClient = (accessToken: string) => {
  return ky.extend({
    prefixUrl: GOOGLE_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });
};

export const getGoogleCalendarEvents = async ({
  token,
  startDate,
  endDate,
}: IGoogleCalendarDate & { token: string }): Promise<IResponseGoogleCalendarEvent[]> => {
  const googleCalendarClient = googleApiClient(token);

  try {
    const response = await googleCalendarClient
      .get('calendars/primary/events', {
        searchParams: {
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        },
      })
      .json();

    const data = response as { items?: IResponseGoogleCalendarEvent[] };
    const items = data.items ?? [];

    return items;
  } catch (error) {
    console.error('Error fetching events:', error);

    throw error;
  }
};
