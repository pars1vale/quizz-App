import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Question from './components/Quiz/Question';
import QuizResult from './components/Quiz/QuizResult';
import { fetchQuestions } from './services/api.js';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [user, setUser] = useLocalStorage('quizUser', null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      const data = await fetchQuestions();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimeout = () => {
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // Load saved quiz data from localStorage
  useEffect(() => {
    const savedQuizData = JSON.parse(localStorage.getItem('quizData'));
    if (savedQuizData && user) {
      const { index, answers, completed } = savedQuizData;
      setCurrentQuestionIndex(index);
      setAnswers(answers);
      setQuizCompleted(completed);
      if (!completed) {
        setQuizStarted(true);
      }
    }
  }, [user]);

  // Save quiz progress to localStorage
  useEffect(() => {
    if (user && quizStarted) {
      const quizData = {
        index: currentQuestionIndex,
        answers,
        completed: quizCompleted
      };
      localStorage.setItem('quizData', JSON.stringify(quizData));
    }
  }, [currentQuestionIndex, answers, quizCompleted, quizStarted, user]);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route
            path="/"
            element={
              quizStarted ? (
                quizCompleted ? (
                  <QuizResult
                    questions={questions}
                    answers={answers}
                    resetQuiz={resetQuiz}
                  />
                ) : (
                  <Question
                    question={questions[currentQuestionIndex]}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                    handleAnswer={handleAnswer}
                    handleTimeout={handleTimeout}
                    loading={loading}
                    error={error}
                  />
                )
              ) : (
                <div className="quiz-start">
                  <h2>Selamat datang, {user.name}!</h2>
                  <p>Kuis ini terdiri dari 10 pertanyaan benar/salah.</p>
                  <p>Anda memiliki waktu 2 menit per soal.</p>
                  <button onClick={() => {
                    loadQuizData();
                    startQuiz();
                  }} disabled={loading}>
                    {loading ? 'Memuat soal...' : 'Mulai Kuis'}
                  </button>
                  {error && <p className="error">{error}</p>}
                </div>
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;