import ChangePassword from '@/components/form/settings/change-password';
import {Button} from '@/components/ui/button';
import {Loader} from '@/components/ui/loading';
import {ProfileType} from '@/types';
import {useEffect, useState} from 'react';

interface ProfileProps {
  data: ProfileType | null;
  loading: boolean;
  error: any;
  onUpdate: (formData: any) => void;
}

const Profile = ({data, loading, error, onUpdate}: ProfileProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // ✅ Pre-fill when data changes
  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || '');
      setLastName(data.lastName || '');
      setEmail(data.email || '');
      setPhone(data.phoneNumber || '');
    }
  }, [data]);

  const handleSubmit = () => {
    const formData = {firstName, lastName, email, phone};
    console.log(formData);
    onUpdate(formData);
  };

  // ✅ Conditional UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 mx-6 text-red-500">
        <p>Error loading profile. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 mx-6">
      {/* 2-column form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div>
          <label className="text-gray-800">First name</label>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-800">Last name</label>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div>
          <label className="text-gray-800">Email address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-gray-300 border rounded-lg px-3 py-3 mt-1 outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800">Phone number</label>
          <div className="flex mt-1">
            <span className="bg-gray-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300">
              +234
            </span>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full placeholder:text-gray-900 border border-gray-300 rounded-r-lg px-3 py-3"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        <label className="text-lg">Password</label>
        <ChangePassword />
      </div>

      <Button onClick={handleSubmit} className="mt-16 w-44">
        Update Profile
      </Button>
    </div>
  );
};

export default Profile;
