import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import ButtonAppBar from "../App/ButtonAppBar";
import User from "../../media/user.png";
async function deleteAccount(token) {
  return fetch(`${process.env.REACT_APP_API_URL}/delete`, {
    method: "POST",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.json());
}

async function changePassword(new_password, new_password_2, token) {
  console.log(token);
  return fetch(
    `${process.env.REACT_APP_API_URL}/update?new_password=${new_password}&new_password_2=${new_password_2}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((data) => data.json());
}
export default function UserPage({ token, setToken }) {
  console.log(token);
  const [password, setPassword] = useState();
  const [passwordBis, setPasswordBis] = useState();

  async function handleChangePassword(e, tok) {
    e.preventDefault();
    setPassword("");
    setPasswordBis("");
    const token = await changePassword(password, passwordBis, tok);
  }

  const handleDelete = async (e, tok) => {
    e.preventDefault();
    deleteAccount(tok);
    sessionStorage.setItem("token", null);
    setToken(null);
  };

  return (
    <>
      <ButtonAppBar token={token} setToken={deleteAccount} />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src={User} alt="Workflow" />
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nouveaux mot de passe"
                  onChange={(e) => setPassword(e.target.value, token)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="passwordBis"
                  name="passwordBis"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmer le mot de passe"
                  onChange={(e) => setPasswordBis(e.target.value, token)}
                />
              </div>
            </div>

            <div>
              <button
                onClick={(e) => handleChangePassword(e, token)}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <SettingsIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Changer de mot de passe
              </button>
            </div>
            <div>
              <button
                onClick={(e) => handleDelete(e, token)}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <DeleteIcon
                    className="h-5 w-5 text-red-400 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Supprimer mon compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
