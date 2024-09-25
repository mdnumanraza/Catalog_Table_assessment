import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "bootstrap/dist/css/bootstrap.min.css";
import { initialConfig, initialData } from "./constants";
import DraggableColumn from "./Components/DraggableCol";
import TableCell from "./Components/TableCell";
import ControlPanel from "./Components/ControlPanel";

const App = () => {
  const [columns, setColumns] = useState(
    () => JSON.parse(localStorage.getItem("tableColumns")) || initialConfig
  );
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("tableData")) || initialData
  );

  useEffect(() => {
    localStorage.setItem("tableColumns", JSON.stringify(columns));
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [columns, data]);

  const moveColumn = (dragIndex, hoverIndex) => {
    const updatedColumns = [...columns];
    const [draggedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, draggedColumn);
    setColumns(updatedColumns);
  };

  const handleCellChange = (rowIndex, columnKey, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnKey] = value;
    setData(updatedData);
  };

  const addRow = () => {
    const newRow = { id: `${data.length + 1}` };
    columns.forEach((col) => {
      newRow[col.label] = col.type === "checkbox" ? false : "";
    });
    setData([...data, newRow]);
  };

  const addColumn = () => {
    const newColumnLabel = prompt("Enter Column Name: ");
    if (!newColumnLabel) {
      alert("Column name cannot be empty.");
      return;
    }

    const isDuplicate = columns.some((col) => col.label === newColumnLabel);
    if (isDuplicate) {
      alert("A column with this name already exists.");
      return;
    }

    const newColumn = { type: "text", label: newColumnLabel };
    const updatedData = data.map((row) => ({
      ...row,
      [newColumnLabel]: "",
    }));

    setColumns([...columns, newColumn]);
    setData(updatedData);
  };

  const downloadTable = () => {
    const tableState = { columns, data };
    console.log(JSON.stringify(tableState, null, 2));
    alert("please check console");
  };

  return (
    <div className="App m-4">
      <ControlPanel
        downloadTable={downloadTable}
        addRow={addRow}
        addColumn={addColumn}
      />
      <DndProvider backend={HTML5Backend}>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <DraggableColumn
                  key={index}
                  col={col}
                  index={index}
                  moveColumn={moveColumn}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    type={col.type}
                    value={row[col.label]}
                    options={col.options}
                    onChange={(value) =>
                      handleCellChange(rowIndex, col.label, value)
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DndProvider>
    </div>
  );
};

export default App;
