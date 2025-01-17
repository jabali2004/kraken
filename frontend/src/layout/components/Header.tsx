import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="navbar container mx-auto p-4 rounded-lg bg-primary">
      {/* <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow text-white bg-primary rounded-box w-52">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">MetaMorph</a>
      </div>
      {/* <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
}
