import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function QuestionForm() {
  const [name, setName] = useState('');
  const [index, setIndex] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [importMessage, setImportMessage] = useState("");
  const [importError, setImportError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Change if needed (For example if the port is changed)
    const uri = "http://localhost:8080/api/faq/ask";
    try {
      const res = await fetch(uri, {
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

  const handleImport = async (e) => {
   
    setImportMessage("");
    setImportError("");
    if (!e.target.files.length) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8080/api/import/file", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      let users = [];
      if (res.ok && data.message) {
        try {
          users = JSON.parse(data.message);
        } catch (e) {
          setImportError("Грешка при читање на податоците од серверот.");
          return;
        }
      }
      if (users.length) {
        let successCount = 0;
        let failCount = 0;
        for (const user of users) {
          const templateParams = {
            user_name: user.name,
            user_index: user.index,
            user_email: user.email,
            user_question: user.question,
            system_answer: user.answer,
          };
          try {
            await emailjs.send(
              "service_gcpzccr",
              "template_pbp440i",
              templateParams,
              "8WEC8xLMkHjte5iR3"
            );
            successCount++;
          } catch (err) {
            failCount++;
          }
        }
        setImportMessage(`Успешно испратени ${successCount} е-пошта${successCount !== 1 ? 'и' : ''}. ${failCount > 0 ? `Неуспешни: ${failCount}` : ''}`);
      } else if (res.ok) {
        setImportMessage("Успешно импортирано!");
      } else {
        setImportError(data.error || "Се случи грешка при импортирање.");
      }
    } catch (err) {
      setImportError("Се случи грешка при импортирање.");
    }
  };

  const handleExportAll = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/faq/export/all", {
        method: "GET",
      });
      
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/pdf")) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "all_questions_answers.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          const errorText = await res.text();
          alert(errorText || "Се случи грешка при експортирање.");
        }
      } else {
        const errorText = await res.text();
        alert(errorText || "Се случи грешка при експортирање.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Се случи грешка при експортирање. Проверете дали серверот работи.");
    }
  };

  const handleExportUnanswered = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/export/unanswered", {
        method: "GET",
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "unanswered_questions.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Се случи грешка при експортирање.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Се случи грешка при експортирање.");
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
        {/* Import section */}
        <div className="mt-8 flex flex-col items-center">
          <input
            type="file"
            id="import-file"
            accept=".csv,.xlsx,.xls,.json,.txt"
            className="hidden"
            onChange={handleImport}
          />
          <button
            type="button"
            onClick={() => document.getElementById("import-file").click()}
            className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Импортирај
          </button>
          {importMessage && <div className="mt-4 text-green-600">{importMessage}</div>}
          {importError && <div className="mt-4 text-red-600">{importError}</div>}
        </div>
        {/* Export section */}
        <div className="mt-8 flex flex-col items-center">
          <button
            type="button"
            onClick={handleExportAll}
            className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Експортирај ги сите прашања и одговори
          </button>
        </div>
      </div>
    </div>
  );
}
