import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import IntroPage from './pages/Intro';
import HomePage from './pages/Home';
import CommunityPage from './pages/Community';
import CommunityDetailPage from './pages/CommunityDetail';
import CommunityWritePage from './pages/CommunityWrite';
import MyPage from './pages/MyPage';
import ChatPage from './components/Chat/Chat';
import LoginPage from './components/NaverLogin/NaverLogin';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [introComplete, setIntroComplete] = useState(() => {
    return sessionStorage.getItem('introComplete') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('introComplete', introComplete.toString());
    console.log('introComplete 상태가 변경되었습니다:', introComplete);
  }, [introComplete]);

  return (
    <AuthProvider>
      <Router>
        {!introComplete && (
          <IntroPage onComplete={() => setIntroComplete(true)} />
        )}
        {introComplete && (
          <>
            <Header />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    !introComplete ? (
                      <IntroPage onComplete={() => setIntroComplete(true)} />
                    ) : (
                      <HomePage />
                    )
                  }
                />
                <Route path="/home" element={<HomePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route
                  path="/community/:postId"
                  element={<CommunityDetailPage />}
                />
                <Route
                  path="/community/write"
                  element={<CommunityWritePage />}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
            </main>
          </>
        )}
      </Router>
    </AuthProvider>
  );
};

export default App;
