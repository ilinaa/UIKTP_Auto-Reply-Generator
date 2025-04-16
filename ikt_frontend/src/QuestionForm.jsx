import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function QuestionForm() {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
  
      const data = await res.json();
      const answer = data.answer;

      const templateParams = {
        user_name: name,
        user_index: index,
        user_email: email,
        user_question: question,
        system_answer: answer,
      };
  
      await emailjs.send(
        "service_gcpzccr",    
        "template_pbp440i",   
        templateParams,
        "8WEC8xLMkHjte5iR3"  
      );
  
      alert("Прашњето беше испратено и одговорено преку е-пошта!");
    } catch (err) {
      console.error("Error:", err);
      alert("Се случи грешка. Обидете се повторно.");
    }
  };
  

  return (
    <div className="w-full bg-dark-blue  min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">
          Избегни ги долгите редици, постави го своето прашање тука
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="space-y-6 lg:space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Име:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Вашето име"
              />
            </div>

            <div>
              <label htmlFor="index" className="block text-lg font-medium text-gray-700">Индекс:</label>
              <input
                type="text"
                id="index"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Вашиот индекс"
              />
            </div>
          </div>
          <div className="space-y-6 lg:space-y-4">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Мејл:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Вашиот мејл"
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-lg font-medium text-gray-700">Вашето прашање:</label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                placeholder="Пишете го вашето прашање овде"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <button type="submit" className="w-full py-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              Поставете прашање
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
