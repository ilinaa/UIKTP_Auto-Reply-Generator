import React, { useState } from 'react';

export default function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      {/* Full width container */}
      <div className="w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-green-900 mb-8 font-bold mt-10">
          Често поставувани прашања
        </h1>

        <div className="space-y-6">
          {/* Прашање 1 */}
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(0)}
            >
              <h2 className="text-xl font-medium text-gray-800">Што е AI-поддржан помошник?</h2>
              <span className="text-gray-500">{openIndex === 0 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 0 && (
              <p className="text-gray-600 mt-2">
                AI-поддржан помошник е интелигентен систем кој користи вештачка интелигенција за да одговори на вашите прашања и да ви помогне во различни задачи.
              </p>
            )}
          </div>

          {/* Прашање 2 */}
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(1)}
            >
              <h2 className="text-xl font-medium text-gray-800">Како можам да се пријавам за користење на сервисот?</h2>
              <span className="text-gray-500">{openIndex === 1 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 1 && (
              <p className="text-gray-600 mt-2">
                За да се пријавите, едноставно пополнете ја нашата форма на веб-страницата и ќе добиете инструкции за понатамошни чекори.
              </p>
            )}
          </div>

          {/* Прашање 3 */}
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(2)}
            >
              <h2 className="text-xl font-medium text-gray-800">Дали сервисот е достапен 24/7?</h2>
              <span className="text-gray-500">{openIndex === 2 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 2 && (
              <p className="text-gray-600 mt-2">
                Да, нашиот AI-помошник е достапен целосно 24 часа на ден, 7 дена во неделата, и е подготвен да ви помогне во секое време.
              </p>
            )}
          </div>

          {/* Прашање 4 */}
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(3)}
            >
              <h2 className="text-xl font-medium text-gray-800">Кои податоци се потребни за регистрација?</h2>
              <span className="text-gray-500">{openIndex === 3 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 3 && (
              <p className="text-gray-600 mt-2">
                За регистрација потребни се вашето име, индекс, мејл адреса, како и кратко прашање што сакате да поставите.
              </p>
            )}
          </div>

          {/* Прашање 5 */}
          <div
            className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(4)}
            >
              <h2 className="text-xl font-medium text-gray-800">Како можам да го контактирам тимот за поддршка?</h2>
              <span className="text-gray-500">{openIndex === 4 ? '▲' : '▼'}</span>
            </div>
            {openIndex === 4 && (
              <p className="text-gray-600 mt-2">
                Можете да не контактирате преку нашиот контакт-формулар на веб-страницата или да ни испратите мејл на поддршка@нашаслужба.com.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
