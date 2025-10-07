import {ReactNode } from 'react';
import logo from '/images/faslogo.png';

interface IProps {
  children: ReactNode;
}

const AuthLayout = ({children}: IProps) => {
 

  return (
    <div className="w-full flex justify-center items-center h-screen bg-[#02539D]  overflow-hidden">
    

      <div className=" block overflow-auto bg-white mx-10 rounded-sm w-full lg:w-[45%] py-10 space-y-5">
        <div className="flex justify-center">
          <img src={logo} className="w-28" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
