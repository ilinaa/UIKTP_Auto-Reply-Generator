import React, {useEffect, useState} from 'react';
import faqService from "./service/faqService.js";
import FAQItem from "./FAQItem.jsx";

export default function FrequentlyAskedQuestions() {
    const [openIndex, setOpenIndex] = useState(null);
    const [FAQs, setFAQs] = useState(null);

    useEffect(() => {
        faqService.getRandomFAQs()
            .then(response => {
                setFAQs(response.data);
            })
            .catch(error => {
                console.error("Error fetching FAQs:", error);
                setFAQs([]);
            });
    }, []);

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

                {FAQs ? <div className="space-y-6">
                        {FAQs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                faq={faq}
                                index={index}
                                isOpen={openIndex === index}
                                toggleAnswer={toggleAnswer}
                            />))}
                    </div> :
                    <p className="text-center text-gray-500">Нема достапни прашања во моментов</p>
                }
            </div>
        </div>
    );
}
