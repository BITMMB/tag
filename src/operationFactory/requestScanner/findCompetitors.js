import { checkCompetitorScript } from '../utils/competitorScriptChecker';

export const findCompetitors = ({ request, setCompetitors }) => {
  request.getContent((responseBody, encoding) => {
    if (typeof responseBody !== 'string') {
      try {
        responseBody = responseBody.toString();
      } catch (error) {
        console.error('Ошибка преобразования ответа в строку:', error);
        return;
      }
    }

    // Поиск ключа конкурента в ответе
    const competitorKey = checkCompetitorScript(responseBody);
    if (competitorKey) {
      setCompetitors((prev) => [...prev, competitorKey]);

      console.log(`Найден конкурент: ${competitorKey}`);
    }
  });
};
