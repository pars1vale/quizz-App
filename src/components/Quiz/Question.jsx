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

    // Reset selected answer ketika soal berubah
    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentIndex]);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
        setTimeout(() => {
            handleAnswer(answer);
        }, 500);
    };

    // Jika masih loading, tampilkan loading indicator
    if (loading) return <div className="loading">Memuat soal...</div>;

    // Jika ada error, tampilkan error
    if (error) return <div className="error">{error}</div>;

    // Jika question belum ada (null/undefined), tetap tampilkan loading
    if (!question) return <div className="loading">Memuat soal...</div>;

    return (
        <div className="question-container">
            <div className="quiz-header">
                <h2>Soal {currentIndex + 1} dari {totalQuestions}</h2>
                <QuizTimer
                    duration={120}
                    onTimeout={handleTimeout}
                    key={currentIndex} // Key penting untuk reset timer
                />
            </div>

            <div className="question-content">
                <h3 dangerouslySetInnerHTML={{ __html: question.question }} />

                <div className="answer-options">
                    <button
                        className={`answer-btn ${selectedAnswer === 'True' ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer('True')}
                        disabled={selectedAnswer !== null}
                    >
                        Benar
                    </button>
                    <button
                        className={`answer-btn ${selectedAnswer === 'False' ? 'selected' : ''}`}
                        onClick={() => handleSelectAnswer('False')}
                        disabled={selectedAnswer !== null}
                    >
                        Salah
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Question;