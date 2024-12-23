import { LockFilled, UserOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { InteractiveLogin } from '../../components/organisms/InteractiveLogin/InteractiveLogin';

export const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [cursorPasswordPosition, setCursorPasswordPosition] = useState(0);

  const handleMailChange = () => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      const position = input.selectionStart ?? 0;
      setCursorPosition(position);
    }
  };

  const handlePasswordChange = () => {
    const input = inputPasswordRef.current;
    if (input) {
      input.focus();
      const position = input.selectionStart ?? 0;
      setCursorPasswordPosition(position);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center bg-slate-200 h-[100vh] gradient-primary">
        <div>
          <div className="card glass w-96 mt-24">
            <div className="flex flex-col mx-auto -mt-20">
              <InteractiveLogin
                showHead={isFocused}
                animateEyes={cursorPosition}
                animateHands={cursorPasswordPosition}
                className="relative"
              />
            </div>
            <div className="card-body py-2">
              <h2 className="card-title uppercase mx-auto text-primary-red dark:text-white">
                Login
              </h2>
              <label className="input input-bordered bg-gray-300 flex items-center gap-2 text-primary-red ">
                <UserOutlined />
                <input
                  ref={inputRef}
                  type="text"
                  name="email"
                  className="grow placeholder:text-primary-red"
                  placeholder="Username"
                  autoComplete="on"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={handleMailChange}
                />
              </label>
              <label className="input input-bordered bg-gray-300 text-primary-red flex items-center gap-2">
                <LockFilled />
                <input
                  ref={inputPasswordRef}
                  type="password"
                  name="current-password"
                  className="grow"
                  autoComplete="on"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={handlePasswordChange}
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
