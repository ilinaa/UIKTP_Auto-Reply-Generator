import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import NavBar from './NavBar';
import Banner from './Banner';
import AboutUs from './AboutUs';
import Footer from './Footer';
import QuestionForm from './QuestionForm';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Contact from './Contact';

function HomePage() {
  return (
    <>
      <Banner />
      <QuestionForm/>
      <FrequentlyAskedQuestions/>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className={"pt-16 flex-grow"}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/questions" element={<FrequentlyAskedQuestions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/questionForm" element={<QuestionForm />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
