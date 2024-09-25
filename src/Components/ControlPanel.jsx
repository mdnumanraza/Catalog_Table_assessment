// components/ControlPanel.js

import React from "react";

const ControlPanel = ({ addRow, addColumn, downloadTable }) => {
  return (
    <div style={{ marginBottom: "10px" }} className="text-white">
      <button onClick={addRow} className="btn bg-slate-800 me-2 text-white">
        Add Row
      </button>
      <button onClick={addColumn} className="btn bg-slate-800 me-2 text-white">
        Add Column
      </button>
      <button onClick={downloadTable} className="btn bg-green-800 text-white">
        Log Table Data
      </button>
    </div>
  );
};

export default ControlPanel;
