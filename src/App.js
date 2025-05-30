// Tambahkan di bagian atas App.js
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Question from './components/Quiz/Question';
import QuizResult from './components/Quiz/QuizResult';
import { fetchQuestions } from './services/api';
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

  // Pastikan untuk membersihkan localStorage saat mulai quiz baru
  const startQuiz = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('quizData'); // Bersihkan data sebelumnya
      const data = await fetchQuestions();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setQuizCompleted(false);
      setQuizStarted(true);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Perbaiki handleAnswer untuk memastikan quizCompleted di-set dengan benar
  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    // Pindah ke soal berikutnya atau selesaikan quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
      localStorage.setItem('quizData', JSON.stringify({
        index: currentQuestionIndex,
        answers: newAnswers,
        completed: true
      }));
    }
  };

  // Perbaiki render utama
  return (
    <Router>
      <Layout user={user} setUser={setUser}>
        <Routes>
          <Route
            path="/"
            element={
              !user ? (
                <Login setUser={setUser} />
              ) : quizStarted ? (
                quizCompleted || answers.length === questions.length ? (
                  <QuizResult
                    questions={questions}
                    answers={answers}
                    resetQuiz={() => {
                      setQuizStarted(false);
                      setQuizCompleted(false);
                    }}
                  />
                ) : (
                  <Question
                    question={questions[currentQuestionIndex]}
                    currentIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                    handleAnswer={handleAnswer}
                    handleTimeout={() => setQuizCompleted(true)}
                    loading={loading}
                    error={error}
                  />
                )
              ) : (
                <div className="start-quiz-container">
                  <h2>Selamat datang, {user.name}!</h2>
                  <button onClick={startQuiz} disabled={loading}>
                    {loading ? 'Memuat...' : 'Mulai Kuis'}
                  </button>
                </div>
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;