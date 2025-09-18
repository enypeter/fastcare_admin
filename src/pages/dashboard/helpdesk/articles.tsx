import {DashboardLayout} from '@/layout/dashboard-layout';
import img from '/images/img.png';
import {MoreVertical} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddArticle from '@/components/form/help-desk/add-articles';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const navigate = useNavigate()
  const tutorials = [
    {
      id: 1,
      title: 'How to fund your offline wallet',
      description:
        'This is a tutorial on how to fund your offline wallet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. .',
      image: img,
      date: 'Aug. 20. 2024',
      time: '3 mins read',
    },
    {
      id: 2,
      title: 'How to withdraw your funds',
      description:
        'This is a tutorial on how to fund your offline wallet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. .',
      image: img,
      date: 'Aug. 20. 2024',
      time: '3 mins read',
    },
    {
      id: 3,
      title: 'How to withdraw your funds',
      description:
        'This is a tutorial on how to fund your offline wallet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. .',
      image: img,
      date: 'Aug. 20. 2024',
      time: '3 mins read',
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll h-full">
        {/* Page Header */}
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <h1 className="text-2xl font-medium text-gray-700">All Articles</h1>
          <AddArticle/>
        </div>

        {/* Card Section */}
        <div className="bg-white mt-10 py-6 mx-10 rounded-md h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
            {tutorials.map(tutorial => (
              <div
                key={tutorial.id}
                onClick={() => navigate(`/help-desk/articles/${tutorial.id}`)}
                className="border border-primary rounded-lg shadow-md cursor-pointer "
              >
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="rounded-md w-full  object-cover mb-4"
                />

                <div className=' p-2'>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {tutorial.title}
                    </h2>

                    <MoreVertical />
                  </div>

                  <div className="flex items-center justify-between">
                    <h2 className=" text-gray-600">
                      {tutorial.date}
                    </h2>

                   <h2 className=" text-gray-600">
                      {tutorial.time}
                    </h2>
                  </div>
                </div>

                <p className="text-gray-600 text-md mb-2 p-2">{tutorial.description}</p>

                <div className='p-2 mb-6'> 
                    <Button onClick={() => navigate(`/help-desk/articles/${tutorial.id}`)} variant="ghost" className='py-2.5 w-36'>See more</Button>

                </div>

                
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Articles;
