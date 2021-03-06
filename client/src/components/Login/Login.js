import { LockClosedIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import { useState } from "react";
import ButtonAppBar from "../App/ButtonAppBar";
import logo from "../../media/logo.png";
import Modal from "../Modal/index";
import { Rings } from "react-loader-spinner";

async function loginUser(credentials) {
  const { password, username } = credentials;

  return fetch(`${process.env.REACT_APP_API_URL}/token`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `password=${password}&username=${username}`,
  }).then((data) => data.json());
}

async function signUp(credentials) {
  const { password, username } = credentials;

  return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, username: username }),
  }).then((data) => data.json());
}
export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    loginUser({
      username,
      password: password,
    })
      .then((val) => {
        setToken(val.access_token);
        if (val["detail"] !== "") throw val["detail"];
      })
      .catch((val) => {
        setError(true);
        setErrorMessage(val);
      })
      .finally(() => setLoading(false));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const created = await signUp({
      username,
      password,
    });
    console.log(created);
    setLoading(false);
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      {error ? (
        <Modal
          title="Error"
          message={errorMessage}
          error={error}
          setError={setError}
        />
      ) : (
        ""
      )}
      <ButtonAppBar token={undefined} setToken={undefined} />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div
            style={{
              position: "fixed",
              zIndex: 2,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Rings color="#00BFFF" height={200} width={200} />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connectez vous ?? votre compte
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Adresse Mail"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Se connecter
              </button>
            </div>
            <div>
              <button
                onClick={handleSignUp}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Cr??er un compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

Login.propType = {
  setToken: PropTypes.func.isRequired,
};
