import {Button} from '@/components/ui/button';
import {DashboardLayout} from '@/layout/dashboard-layout';
import {MoreVertical, User} from 'lucide-react';
import article from '/images/article.png'

const ArticleDetails = () => {
  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll flex flex-col h-full">
        <div className="bg-white mt-10 py-4 h-full  mx-10 rounded-md overflow-scroll pb-36 mb-28 ">
          <div className="lg:mx-24 py-10">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-xl lg:text-3xl font-semibold">
                  How to fund offline wallet
                </h1>

                <MoreVertical />
              </div>
              <div className="flex items-center gap-3 mt-4 ">
                <User />
                <span className="text-xl">John Doe</span>
              </div>
              <div className="flex items-center gap-8 mt-1 ">
                <span className="text-md text-gray-600">3 mins read</span>

                <span className="text-md text-gray-600">20th Aug.2024</span>
              </div>

              <div className="mt-6">
                <img src={article} />
              </div>

              <div className="mt-6">
                <p className="text-gray-600 text-lg mb-2">
                  This is a tutorial on how to fund your offline wallet. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat
                </p>
              </div>

              <div className="border-t border-blue-100 py-4 flex items-center gap-4 mt-6">
                <Button className="py-2 bg-blue-100 text-blue-900 w-36 border-none rounded-md">
                  Wallet
                </Button>
                <Button className="py-2 bg-blue-100 text-blue-900 w-36 border-none rounded-md">
                  Healthcare
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArticleDetails;
