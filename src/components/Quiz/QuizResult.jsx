import { useEffect, useState } from 'react';
import QuizTimer from './QuizTimer';
import './Quiz.css';

const Question = ({
    question,
    currentIndex,
    totalQuestions,
    handleAnswer,
    handleTimeout,
    loading,
    error
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionTimeout, setQuestionTimeout] = useState(false);

    useEffect(() => {
        setSelectedAnswer(null);
        setQuestionTimeout(false);
    }, [currentIndex]);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
        setTimeout(() => {
            handleAnswer(answer);
        }, 500);
    };

    if (loading) return <div className="loading">Memuat soal...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!question) return <div className="loading">Memuat soal...</div>;

    return (
        <div className="question-container">
            <div className="quiz-header">
                <h2>Soal {currentIndex + 1} dari {totalQuestions}</h2>
                <QuizTimer
                    duration={120}
                    onTimeout={() => {
                        setQuestionTimeout(true);
                        handleTimeout();
                    }}
                    key={currentIndex}
                />
            </div>

            <div className="question-content">
                <h3 dangerouslySetInnerHTML={{ __html: question.question }} />

                <div className="answer-options">
                    <button
                        className={`answer-btn ${selectedAnswer === 'True' ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer('True')}
                        disabled={questionTimeout || selectedAnswer !== null}
                    >
                        Benar
                    </button>
                    <button
                        className={`answer-btn ${selectedAnswer === 'False' ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer('False')}
                        disabled={questionTimeout || selectedAnswer !== null}
                    >
                        Salah
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Question;