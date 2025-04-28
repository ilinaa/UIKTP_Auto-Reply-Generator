import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Banner from './Banner';
import AboutUs from './AboutUs';
import Footer from './Footer';
import QuestionForm from './QuestionForm';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import Contact from './Contact';
import Informations from './Informations';

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

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions" element={<FrequentlyAskedQuestions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/informations" element={<Informations />} />
          <Route path="/questionForm" element={<QuestionForm />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
