import React from 'react';

const FAQItem = ({ faq, index, isOpen, toggleAnswer }) => {
    return (
        <div className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
            >
                <h2 className="text-xl font-medium text-gray-800">{faq.question}</h2>
                <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <p className="text-gray-600 mt-2" style={{ whiteSpace: 'pre-line' }}>
                    {faq.answer}
                </p>
            )}
        </div>
    );
};

export default FAQItem;