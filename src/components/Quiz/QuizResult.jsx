import './Quiz.css';

const QuizResult = ({ questions, answers, resetQuiz }) => {
    // Hitung skor dengan benar
    const calculateScore = () => {
        let correct = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct_answer) {
                correct++;
            }
        });
        return correct;
    };

    const correctAnswers = calculateScore();
    const totalQuestions = questions.length;

    return (
        <div className="result-container">
            <h2>Hasil Kuis Film</h2>

            <div className="result-summary">
                <div className="result-card correct">
                    <h3>Benar</h3>
                    <p>{correctAnswers}</p>
                </div>

                <div className="result-card incorrect">
                    <h3>Salah</h3>
                    <p>{totalQuestions - correctAnswers}</p>
                </div>

                <div className="result-card total">
                    <h3>Total</h3>
                    <p>{totalQuestions}</p>
                </div>
            </div>

            <button onClick={resetQuiz} className="restart-btn">
                Mulai Kuis Baru
            </button>
        </div>
    );
};

export default QuizResult;