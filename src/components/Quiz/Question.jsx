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

    // Reset state ketika soal berubah
    useEffect(() => {
        setSelectedAnswer(null);
    }, [currentIndex]);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
        handleAnswer(answer); // Langsung panggil handleAnswer tanpa timeout
    };

    // Tampilkan loading hanya jika benar-benar loading
    if (loading && !question) {
        return (
            <div className="quiz-loading">
                <p>Memuat soal...</p>
            </div>
        );
    }

    // Tampilkan error jika ada
    if (error) {
        return (
            <div className="quiz-error">
                <p>Error: {error}</p>
            </div>
        );
    }

    // Pastikan question ada sebelum render
    if (!question) {
        return (
            <div className="quiz-error">
                <p>Tidak ada soal yang tersedia</p>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Soal {currentIndex + 1} dari {totalQuestions}</h2>
                <QuizTimer
                    duration={120}
                    onTimeout={handleTimeout}
                    key={currentIndex} // Key penting untuk reset timer
                />
            </div>

            <div className="quiz-question">
                <div dangerouslySetInnerHTML={{ __html: question.question }} />

                <div className="quiz-answers">
                    <button
                        onClick={() => handleSelectAnswer('True')}
                        disabled={selectedAnswer !== null}
                    >
                        Benar
                    </button>
                    <button
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