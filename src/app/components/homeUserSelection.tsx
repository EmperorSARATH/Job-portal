
import Link from 'next/link';
import React, { forwardRef } from 'react';

interface SecondSectionProps {
  ref: React.Ref<HTMLDivElement>;
}

const HomeUserSelection = forwardRef<HTMLDivElement>((_, ref) => (
  <div>
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center flex h-screen bg-gray-100 "
    >
      <div className='md:mr-5 border border-gray-300 shadow-lg rounded-lg p-6 bg-white'>
        <h1
          className="text-center text-5xl custom-h1 text-black "
          style={{ fontFamily: "'Lobster', cursive" }}
          
        >
            <Link href="/login">Employee Account</Link>
        </h1>
        <p className=' mt-4 text-2xl text-black'>Want to log in as an Employee ?</p>
      </div>

      <div className='md:mr-5 mt-5 sm:mt-0 border border-gray-300 shadow-lg rounded-lg p-6 bg-white'>

        <h1
          className="text-center text-5xl custom-h1 text-black  "
          style={{ fontFamily: "'Lobster', cursive" }}
        >
          <Link href="/EmployerLogin">Employer Account</Link>

        </h1>
       <p className=' mt-4 text-2xl text-black'>Want to log in as an Employer ?</p>

      </div>

    </div>

  </div>
));

HomeUserSelection.displayName = 'SecondSection';

export default HomeUserSelection;
