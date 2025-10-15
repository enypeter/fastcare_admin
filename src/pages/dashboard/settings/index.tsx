import { DashboardLayout } from '@/layout/dashboard-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Profile from '@/features/modules/settings/profile';
import Services from '@/features/modules/settings/service';
import UserRole from '@/features/modules/settings/role';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/store';
import { fetchProfile, updateProfile } from '@/services/thunks';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'details';
  const [activeTab, setActiveTab] = useState(initialTab);

  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.account
  );

  const tabs = [
    { key: 'details', label: 'Profile Detail' },
    { key: 'settings', label: 'Service settings' },
    { key: 'role', label: 'User Role' },
  ];

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);


   // Submit handler for profile update
  const handleUpdate = (formData: unknown) => {
    dispatch(updateProfile(formData as Record<string, unknown>));
  };


  return (
    <DashboardLayout>
      <div className="bg-gray-100 overflow-scroll flex flex-col h-full">
        <div className="flex items-center justify-between gap-6 mx-10 mt-16">
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 rounded-lg">
              <AvatarImage src={profile?.profileImagePath || "/images/user.png"} alt={profile?.firstName} />
              <AvatarFallback className="uppercase bg-primary text-white font-bold">
                {profile?.firstName?.[0]}
                {profile?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-xl font-medium text-gray-700">
              {profile ? `${profile.firstName} ${profile.lastName}` : "Loading..."}
            </h1>
          </div>

          {/* Deactivate account button removed pending account-level endpoint */}
        </div>

        <div className="bg-white mt-10 py-4 mx-10 rounded-md pb-36 mb-28 ">
          {/* Tabs */}
          <div className="flex gap-8 lg:gap-44 border-b border-gray-200 overflow-x-scroll">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 whitespace-nowrap -mb-px text-md transition-all border-b-4
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
          <div className="mt-6">
            {activeTab === 'details' && (
              <Profile
                data={profile}
                loading={loading}
                error={error}
                 onUpdate={handleUpdate}
              />
            )}
            {activeTab === 'settings' && <Services />}
            {activeTab === 'role' && <UserRole />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
