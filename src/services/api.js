export const fetchQuestions = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=boolean');
    if (!response.ok) {
        throw new Error('Gagal memuat soal kuis');
    }
    const data = await response.json();
    return data.results;
};