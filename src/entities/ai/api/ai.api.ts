import ky from 'ky';
import { AI_BASE_URL } from '../lib/ai.constant';

const DEFAULT_PROMPT =
  '한글로 작성줘야해. 아래 데이터로 업무일지를 작성 하려고 해! 모든 데이터 활용해서 최대한 상세하게,모르는 사람도 이해할 수 있게 작성해주세요. 응답값은 마크다운으로 주세요.';
const customPrompt = localStorage.getItem('write-daily-prompt');

const generatePrompt = (taskList: any) => {
  const taskListString = JSON.stringify(taskList);
  return `${customPrompt ?? DEFAULT_PROMPT}\n${taskListString}`;
};

export async function generateAIResponse(taskList: any) {
  try {
    const response = await fetch(`/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.1',
        prompt: generatePrompt(taskList),
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('AI 응답 생성 중 오류 발생:', error);
    throw error;
  }
}

const aiClient = ky.extend({
  prefixUrl: AI_BASE_URL,
});

export const getAiSummaryPushEvents = async ({ taskList }: any) => {
  return await aiClient
    .post('generate', {
      json: {
        model: 'llama3.1',
        prompt: generatePrompt(taskList),
        stream: false,
      },
    })
    .json();
};
