import {ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const AuthLayout = ({children}: IProps) => {
 

  return (
    <div className="w-full flex justify-between h-screen bg-[#02539D]  overflow-hidden">

      <div className=' hidden lg:block w-[55%] h-full'>

      </div>
    

      <div className=" block overflow-auto bg-white mx-10 my-5 rounded-sm  w-full lg:w-[45%]">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
