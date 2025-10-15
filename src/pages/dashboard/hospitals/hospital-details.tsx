import {DashboardLayout} from '@/layout/dashboard-layout';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import HospitalDetail from '@/features/modules/hospital/hospital-detail';
import Clinics from '@/features/modules/hospital/clinics';
import {useParams, useSearchParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/services/store';
import {fetchHospitalById} from '@/services/thunks';
import ToggleHospitalStatus from '@/features/modules/hospital/deactivate';
import { ROUTES } from '@/router/routes';
import { ArrowLeft } from 'lucide-react';

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HospitalDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'details';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {selectedHospital, loading, error} = useSelector(
    (state: RootState) => state.hospitals,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchHospitalById(id));
    }
  }, [id, dispatch]);

  const tabs = [
    {key: 'details', label: 'Hospital Detail'},
    {key: 'clinics', label: 'Clinics'},
  ];

  useEffect(() => {
    setSearchParams({tab: activeTab});
  }, [activeTab, setSearchParams]);

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-600">
          {error}
        </div>
      ) : (
        <div className="bg-gray-100 overflow-scroll flex flex-col h-full">
          <div className="flex flex-wrap items-center justify-between gap-6 mx-4 lg:mx-10 mt-16">
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => navigate(ROUTES.hospitals.all)}
                  className="flex items-center gap-2 px-2 text-gray-600 hover:text-primary"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </Button>
                <Avatar className="w-12 h-12 rounded-lg">
                  <AvatarImage
                    src={selectedHospital?.hospitalLogo || '/images/user.png'}
                    alt={selectedHospital?.hospitalName || 'Hospital logo'}
                  />
                  <AvatarFallback className="uppercase bg-primary text-white font-bold">
                    {selectedHospital?.hospitalName?.slice(0, 3) || 'HSP'}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-medium text-gray-700">
                  {selectedHospital?.hospitalName}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                {!isEditing && (
                  <>
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="py-3 lg:w-44 rounded-md"
                    >
                      Edit details
                    </Button>
                    {selectedHospital && (
                      <Button
                        variant={selectedHospital.isActive ? 'destructive' : 'default'}
                        onClick={() => setShowToggle(true)}
                        className="py-3 lg:w-44 rounded-md"
                      >
                        {selectedHospital.isActive ? 'Deactivate Hospital' : 'Activate Hospital'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white mt-10 py-4 mx-10 rounded-md pb-36 mb-28">
            <div className="flex gap-8 lg:gap-44 border-b border-gray-200 overflow-x-scroll">
              {tabs.map(tab => (
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

            <div className="mt-6">
              {activeTab === 'details' && (
                <HospitalDetail
                  data={selectedHospital}
                  isEditing={isEditing}
                  onCancel={() => setIsEditing(false)}
                  onUpdated={() => setIsEditing(false)}
                />
              )}
              {activeTab === 'clinics' && <Clinics hospitalId={id} />}
            </div>
          </div>
        {selectedHospital && (
          <ToggleHospitalStatus
            open={showToggle}
            setOpen={setShowToggle}
            hospitalId={selectedHospital.id}
            isActive={selectedHospital.isActive}
          />
        )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default HospitalDetails;
