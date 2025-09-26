import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DashboardLayout} from '@/layout/dashboard-layout';
import {ChevronDown, MoreVertical} from 'lucide-react';
import AddNewQuestion from '@/components/form/help-desk/add-question';
import {fetchFAQs} from '@/services/thunks';
import {RootState, AppDispatch} from '@/services/store';
import {Loader} from '@/components/ui/loading';
import DeleteFAQ from '@/features/modules/helpdesk/delete-faq';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFAQId, setSelectedFAQId] = useState<number | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const {faqs, loading, error} = useSelector((state: RootState) => state.faqs);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const openDeleteModal = (id: number) => {
    setSelectedFAQId(id);
    setDeleteOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-6 mx-10 mt-16">
          <h1 className="text-2xl font-medium text-gray-700">
            Frequently Asked Questions
          </h1>
          <AddNewQuestion />
        </div>

        {/* Accordion Section */}
        <div className="bg-white mt-10 pt-6 mx-10 rounded-md pb-24 mb-36">
          <div className="m-6 flex flex-col gap-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-6">
                Failed to load FAQs: {error}
              </div>
            ) : faqs.length === 0 ? (
              <div className="text-center text-gray-500 py-6">
                No FAQs available
              </div>
            ) : (
              faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const isDropdownOpen = dropdownIndex === index;

                return (
                  <div
                    key={faq.id ?? index}
                    className={`border rounded-md transition ${
                      isOpen ? 'border-blue-100' : 'border-gray-200'
                    }`}
                  >
                    {/* Header */}
                    <div
                      onClick={() => toggleAccordion(index)}
                      className={`flex items-center justify-between border-b px-4 py-3 cursor-pointer transition ${
                        isOpen
                          ? 'bg-white text-blue-900 border-blue-100'
                          : 'bg-blue-50 text-gray-800'
                      }`}
                    >
                      <h1 className="text-lg font-semibold">{faq.question}</h1>
                      <div className="flex items-center gap-4 relative">
                        <ChevronDown
                          className={`transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                        <div
                          onClick={e => {
                            e.stopPropagation();
                            toggleDropdown(index);
                          }}
                        >
                          <MoreVertical className="text-gray-400 cursor-pointer" />
                        </div>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                          <div className="absolute right-0 top-8 bg-white border rounded-md shadow-lg z-10">
                            <button
                              onClick={() => openDeleteModal(faq.id!)}
                              className="px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    {isOpen && (
                      <div className="px-4 py-6 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <DeleteFAQ
        open={deleteOpen}
        setOpen={setDeleteOpen}
        faqId={selectedFAQId}
      />
    </DashboardLayout>
  );
};

export default FAQ;
