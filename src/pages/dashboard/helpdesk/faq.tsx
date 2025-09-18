import {useState} from 'react';
import {DashboardLayout} from '@/layout/dashboard-layout';
import {ChevronDown, MoreVertical} from 'lucide-react';
import AddNewQuestion from '@/components/form/help-desk/add-question';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I fund my wallet?',
      answer:
        "To fund your wallet, go to the wallet section, click 'Fund Wallet', choose your payment method, and follow the steps.",
    },
    {
      question: 'How do I withdraw my funds?',
      answer:
        "To withdraw, go to the wallet, select 'Withdraw', enter your bank details, and confirm. Funds are processed within 24 hours.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        {/* Page Header */}
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <h1 className="text-2xl font-medium text-gray-700">
            Frequently Asked Questions
          </h1>
          <AddNewQuestion />
        </div>

        {/* Accordion Section */}
        <div className="bg-white mt-10 py-4 mx-10 rounded-md h-full">
          <div className="m-6 flex flex-col gap-4">
            <div></div>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-md transition ${
                    isOpen ? 'border-blue-100' : 'border-gray-200'
                  }`}
                >
                  {/* Header */}
                  <div
                    onClick={() => toggleAccordion(index)}
                    className={`flex items-center justify-between border-b px-4 py-3 cursor-pointer transition  ${
                      isOpen
                        ? 'bg-white text-blue-900 border-blue-100'
                        : 'bg-blue-50 text-gray-800'
                    }`}
                  >
                    <h1 className="text-lg font-semibold">{faq.question}</h1>
                    <div className="flex items-center gap-4">
                      <ChevronDown
                        className={`transition-transform ${
                          isOpen ? 'rotate-180 ' : ''
                        }`}
                      />
                      <MoreVertical className="text-gray-400" />
                    </div>
                  </div>

                  {/* Content */}
                  {isOpen && (
                    <div className="px-4 py-6 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FAQ;
