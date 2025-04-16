import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-16 px-6 lg:px-32 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-4 mt-10">
          За нас
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Официјален AI-поддржан помошник за студентите на ФИНКИ — сите твои
          прашања одговорени за неколку секунди!
        </p>

        <div className="bg-blue-50 p-8 rounded-2xl shadow-xl space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Ние сме тим од посветени и амбициозни студенти од ФИНКИ кои стојат
            зад <strong>Smart-Auto-Reply-Student (SARS)</strong> – официјалниот
            AI-помошник за сите студенти на факултетот. Нашата мисија е
            едноставна: да ја направиме комуникацијата помеѓу студентите и
            студентските служби побрза, поедноставна и поефикасна.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            SARS е веб-апликација која користи вештачка интелигенција за
            автоматско препознавање и одговарање на најчесто поставуваните
            прашања. Без чекање. Без гужви. Само напиши го прашањето и добиј
            одговор за неколку секунди! Доколку прашањето е поспецифично,
            системот автоматски го препраќа до студентската служба.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Со интуитивен дизајн, сигурна архитектура и можности за постојана
            надградба, SARS е чекор напред во дигитализацијата на академската
            поддршка. Овој проект е создаден со визија да се намали
            административното оптоварување и да се подобри целокупното
            студентско искуство.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            👥 Зад SARS стоиме ние – ваши колеги и идни инженери, обединети од
            идејата дека времето на студентите е вредно, и секој одговор треба
            да биде достапен веднаш.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">
            Нашиот тим
          </h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center text-gray-800 font-medium">
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Евросина Стојкоска</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Марија Ефтимова</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Андриана Јанева</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Абдулсамет Нухиј</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Михаил Трајковиќ</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Тео Стојковски</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Илина Ангеловска</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Милан Трпчевски</li>
            <li className="bg-gray-100 rounded-xl py-4 px-6 shadow-md">Филип Трајаноски</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
