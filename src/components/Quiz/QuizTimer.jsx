import { useEffect, useState } from 'react';

const QuizTimer = ({ duration, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        // Reset timer ketika duration berubah
        setTimeLeft(duration);

        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onTimeout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [duration, onTimeout]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={`quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            Waktu: {formatTime(timeLeft)}
        </div>
    );
};

export default QuizTimer;