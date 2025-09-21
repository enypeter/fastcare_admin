import {DashboardLayout} from '@/layout/dashboard-layout';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import Deactivate from '@/features/modules/hospital/deactivate';
import {useSearchParams} from 'react-router-dom';
import DoctorInformation from '@/features/modules/doctor/doctor-details/doctor-information';
import Consultation from '@/features/modules/doctor/doctor-details/consultation';
import Finance from '@/features/modules/doctor/doctor-details/finance';

const DoctorDetails = () => {
  const [open, setOpen] = useState(false);
  // ✅ Hook for managing query params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'information';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    {key: 'information', label: 'Doctor Information'},
    {key: 'consultation', label: 'Consultation'},
    {key: 'finance', label: 'Finance'},
  ];

  useEffect(() => {
    setSearchParams({tab: activeTab});
  }, [activeTab, setSearchParams]);

  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll flex flex-col h-full">
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 rounded-lg">
              <AvatarImage src="/images/user.png" alt="Thelma George" />
              <AvatarFallback className="uppercase bg-primary text-white font-bold">
                JS
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-lg font-medium text-gray-700">John Doe</h1>

              <div className="flex items-center gap-6">
                <p className="text-gray-600 text-md">MBBS, Psychotherapist</p>

                <span className="bg-green-100 text-green-500 p-2 text-sm">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => setOpen(true)}
              variant="destructive"
              className="py-3 rounded-md"
            >
              Deactivate Account
            </Button>
          </div>
        </div>

        <div className="bg-white mt-10 py-4  mx-10 rounded-md mb-24 ">
          {/* Tabs */}
          <div className="flex gap-8 lg:gap-28 border-b border-gray-200 overflow-x-scroll">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3  whitespace-nowrap -mb-px  text-md transition-all border-b-4
                                    ${
                                      activeTab === tab.key
                                        ? 'border-primary text-gray-700 font-medium'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 ">
            {activeTab === 'information' && <DoctorInformation />}
            {activeTab === 'consultation' && <Consultation />}
            {activeTab === 'finance' && <Finance />}
          </div>
        </div>
      </div>

      <Deactivate open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
};

export default DoctorDetails;
