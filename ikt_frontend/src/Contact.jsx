import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-32 text-gray-800 mt-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-green-900 mb-6 text-center">
          Контакт
        </h2>

        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6 text-lg leading-relaxed">
          <p>
            Доколку имате проблем или не добиете соодветен одговор од системот,
            слободно можете да ни пишете на{" "}
            <a
              href="mailto:sars@gmail.com"
              className="text-blue-600 font-semibold underline"
            >
              sars.finki@gmail.com
            </a>
            .
          </p>

          <p>
            Базата на прашања сè уште се гради, па доколку сметате дека
            недостасува одредена информација, ве охрабруваме да ни ја
            испратите. Ние ќе се погрижиме истата да биде додадена и достапна
            за сите студенти.
          </p>

          <div className="border-t border-gray-200 pt-4">
            <p className="font-semibold text-gray-700 mb-2">
              📍 Контакт за студентската служба на ФИНКИ:
            </p>
            <p>
              📧{" "}
              <a
                href="mailto:studentski@finki.ukim.mk"
                className="text-blue-600 underline"
              >
                studentski@finki.ukim.mk
              </a>
            </p>
            <p>📞 070/302-440 (достапни од 13:00 до 15:00 часот)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
