import {DashboardLayout} from '@/layout/dashboard-layout';
import img from '/images/img.png';
import AddTutorial from '@/components/form/help-desk/add-tutorial';

const Tutorials = () => {
  // mock tutorials (you can later fetch these from API)
  const tutorials = [
    {
      id: 1,
      title: 'How to fund your offline wallet',
      description:
        'This is a tutorial on how to fund your offline wallet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. .',
      image: img,
    },
    {
      id: 2,
      title: 'How to withdraw your funds',
      description:
        'This is a tutorial on how to fund your offline wallet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. .',
      image: img,
    },
   
  ];

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        {/* Page Header */}
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <h1 className="text-2xl font-medium text-gray-700">All Tutorials</h1>
          <AddTutorial />
        </div>

        {/* Card Section */}
        <div className="bg-white mt-10 py-6 mx-10 rounded-md h-full">
          <h1 className="text-xl font-semibold text-gray-700 mb-6 mx-6">
            All Tutorials
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
            {tutorials.map(tutorial => (
              <div key={tutorial.id} className=" p-4  ">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {tutorial.title}
                </h2>
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="rounded-md w-full  object-cover mb-4"
                />

                <p className="text-gray-600 text-md">{tutorial.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tutorials;
