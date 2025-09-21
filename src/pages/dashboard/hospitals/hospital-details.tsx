import {DashboardLayout} from '@/layout/dashboard-layout';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import HospitalDetail from '@/features/modules/hospital/hospital-detail';
import Deactivate from '@/features/modules/hospital/deactivate';
import Clinics from '@/features/modules/hospital/clinics';
import {useSearchParams} from 'react-router-dom';

const HospitalDetails = () => {
  const [open, setOpen] = useState(false);
  // ✅ Hook for managing query params
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'details';
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    {key: 'details', label: 'Hospital Detail'},
    {key: 'clinics', label: 'Clinics'},
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
                FMC
              </AvatarFallback>
            </Avatar>

            <h1 className="text-xl font-medium text-gray-700">
              Federal Medical Center, Asaba
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button className="py-3 w-44 rounded-md">Edit details</Button>
            <Button
              onClick={() => setOpen(true)}
              variant="destructive"
              className="py-3 rounded-md"
            >
              Deactivate Account
            </Button>
          </div>
        </div>

        <div className="bg-white mt-10 py-4  mx-10 rounded-md pb-36 mb-28 ">
          {/* Tabs */}
          <div className="flex gap-8 lg:gap-44 border-b border-gray-200 overflow-x-scroll">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3  whitespace-nowrap -mb-px  text-lg transition-all border-b-4
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
            {activeTab === 'details' && <HospitalDetail />}
            {activeTab === 'clinics' && <Clinics />}
          </div>
        </div>
      </div>

      <Deactivate open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
};

export default HospitalDetails;
