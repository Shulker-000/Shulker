import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { Button } from './button.jsx';
import { Card, CardContent } from './Card'; // Assuming these components exist

const Alert = ({ title, iconUrl }) => {
  return (
    <section className="flex items-center w-[100vw] h-[100vh] justify-center bg-gray-200 backdrop-blur-sm">
      <Card className="w-full max-w-[520px] border-none rounded-2xl bg-white/70 backdrop-blur-md p-6 py-9 text-gray-900 shadow-lg">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5 items-center">
              {iconUrl && (
                <div className="flex-center">
                  <img src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>
            <button  className="bg-blue-600 h-[5vh] m-2 text-white hover:bg-blue-700 w-full">
              <Link to="/" className="w-full text-center block">Back to Home</Link>
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Alert;
