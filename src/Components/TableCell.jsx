// components/TableCell.js

import React from "react";

const TableCell = ({ type, value, options, onChange }) => {
  const baseInputClasses = "w-full p-2  rounded focus:outline-none text-white bg-slate-700 ";

  switch (type) {
    case "text":
      return (
        <td>
          <input
            type="text"
            value={value}
            className={`${baseInputClasses} bg-slate-700 `}
            onChange={(e) => onChange(e.target.value)}
          />
        </td>
      );
    case "link":
      return (
        <td>
          <input
            type="text"
            value={value}
            className={`${baseInputClasses} `}
            onChange={(e) => onChange(e.target.value)}
          />
        </td>
      );
    case "checkbox":
      return (
        <td>
          <input
            type="checkbox"
            checked={value}
            className="cursor-pointer bg-slate-700"
            onChange={(e) => onChange(e.target.checked)}
          />
        </td>
      );
    case "dropdown":
      return (
        <td>
          <select
            value={value}
            className={`${baseInputClasses} cursor-pointer`}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
      );
    default:
      return null;
  }
};

export default TableCell;
