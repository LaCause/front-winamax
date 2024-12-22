import { LockFilled, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const Login = () => {
  const [processing, setProcessing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  console.log('execute Login.tsx');

  if (processing) {
    return <p>Authentification en cours ...</p>;
  }
  return (
    <>
      <section className="flex flex-col items-center bg-slate-200 h-[100vh] gradient-primary">
        <div>
          <div className="card glass w-96 mt-24">
            <div className="h-36 w-36 bg-pink-400 rounded-full mx-auto -mt-20 flex justify-center items-center">
              <svg
                width="135"
                height="135"
                viewBox="0 0 201 201"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100.5" cy="100.5" r="100.5" fill="#EFB87E" />
                <circle cx="60.4596" cy="69.4596" r="31.4596" fill="#EAEAEA" />
                <circle cx="59.8847" cy="69.8847" r="11.8847" fill="#2F2F2F" />
                <circle cx="138.46" cy="69.4596" r="31.4596" fill="#EAEAEA" />
                <circle cx="138.459" cy="69.4596" r="11.8847" fill="#2F2F2F" />
              </svg>
            </div>
            <div className="card-body">
              <h2 className="card-title uppercase mx-auto text-primary-red dark:text-white">
                Login
              </h2>
              <label className="input input-bordered bg-gray-300 flex items-center gap-2 text-primary-red ">
                <UserOutlined />
                <input
                  type="email"
                  name="email"
                  className="grow placeholder:text-primary-red"
                  placeholder="Username"
                  autoComplete="on"
                />
              </label>
              <label className="input input-bordered bg-gray-300 text-primary-red flex items-center gap-2">
                <LockFilled />
                <input
                  type="password"
                  name="current-password"
                  className="grow"
                  autoComplete="on"
                />
              </label>
              <p className="text-gray-500 dark:text-white text-sm text-center">
                Vous n'avez pas de compte ? <b>S'inscrire</b>
              </p>
              <div className="card-actions justify-center">
                <button className="btn btn-success">Connexion</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
