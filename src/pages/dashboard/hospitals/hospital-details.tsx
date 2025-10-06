import {DashboardLayout} from '@/layout/dashboard-layout';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {useEffect, useState} from 'react';
import HospitalDetail from '@/features/modules/hospital/hospital-detail';
import Deactivate from '@/features/modules/hospital/deactivate';
import Clinics from '@/features/modules/hospital/clinics';
import {useParams, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '@/services/store';
import {fetchHospitalById, updateHospital} from '@/services/thunks';
import {Hospital} from '@/types';
import {setSelectedHospital} from '@/services/slice/hospitalSlice';

const Loader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HospitalDetails = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'details';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);

  const {id} = useParams<{id: string}>();
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

  const handleSave = async (hospital: Hospital | null) => {
    if (!hospital) return;

    try {
      // Adapt hospital object to expected thunk payload type: Record<string, unknown> & { id: string | number }
      const payload: Record<string, unknown> & { id: string | number } = {
        ...hospital,
        id: hospital.id as string | number,
      };
      await dispatch(updateHospital(payload)).unwrap();

      setIsEditing(false);

      // ✅ Refetch hospital list in background
      dispatch(fetchHospitalById(String(hospital.id)));
    } catch (err) {
      console.error('Update failed:', err);
    }
  };
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
            <div className="flex items-center gap-4">
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
              {isEditing ? (
                <Button
                  onClick={() =>
                    selectedHospital && handleSave(selectedHospital)
                  }
                  className="py-3 lg:w-44 rounded-md"
                >
                  Save changes
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="py-3 lg:w-44 rounded-md"
                >
                  Edit details
                </Button>
              )}

              <Button
                onClick={() => setOpen(true)}
                variant="destructive"
                className="py-3 rounded-md"
              >
                Deactivate Account
              </Button>
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
                  onChange={updated => dispatch(setSelectedHospital(updated))}
                />
              )}
              {activeTab === 'clinics' && <Clinics />}
            </div>
          </div>
        </div>
      )}

      <Deactivate open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
};

export default HospitalDetails;
