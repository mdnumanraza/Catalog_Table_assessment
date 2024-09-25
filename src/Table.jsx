import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import "bootstrap/dist/css/bootstrap.min.css";


// Main Table Component with drag-and-drop and editable support
const App = () => {
  const initialConfig = [
    { type: "text", label: "Name" },
    { type: "link", label: "Website" },
    { type: "checkbox", label: "Active" },
    { type: "dropdown", label: "Category", options: ["A", "B", "C"] }
  ];

  const initialData = [
    { id: "1", Name: "John Doe", Website: "https://google.com", Active: false, Category: "A" }
  ];

  // State initialization from localStorage or default initial values
  const [columns, setColumns] = useState(() => JSON.parse(localStorage.getItem('tableColumns')) || initialConfig);
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('tableData')) || initialData);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tableColumns', JSON.stringify(columns));
    localStorage.setItem('tableData', JSON.stringify(data));
  }, [columns, data]);

  // Handle cell edit
  const handleCellChange = (rowIndex, columnKey, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnKey] = value;
    setData(updatedData);
  };

  // Add a new row with default values
  const addRow = () => {
    const newRow = { id: `${data.length + 1}` };
    columns.forEach((col) => {
      newRow[col.label] = col.type === "checkbox" ? false : "";
    });
    setData([...data, newRow]);
  };

  // Download current table configuration and data
  const downloadTable = () => {
    const tableState = { columns, data };
    console.log(JSON.stringify(tableState, null, 2));
  };

  // Handle row reordering via drag-and-drop
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(data);
    const [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setData(tempData);
  };

  return (
    <div className="App mt-4">
      <ControlPanel addRow={addRow} downloadTable={downloadTable} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table bordered">
          <thead>
            <tr>
              <th />
              {columns.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody ref={provider.innerRef} {...provider.droppableProps}>
                {data.map((row, rowIndex) => (
                  <Draggable key={row.id} draggableId={row.id} index={rowIndex}>
                    {(provider) => (
                      <tr
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                        {...provider.dragHandleProps}
                      >
                        <td>=</td>
                        {columns.map((col, colIndex) => (
                          <TableCell
                            key={colIndex}
                            type={col.type}
                            value={row[col.label]}
                            options={col.options}
                            onChange={(value) => handleCellChange(rowIndex, col.label, value)}
                          />
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
};

// Table Cell Component for handling different types of input fields
const TableCell = ({ type, value, options, onChange }) => {
  switch (type) {
    case "text":
      return (
        <td>
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
        </td>
      );
    case "link":
      return (
        <td>
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
        </td>
      );
    case "checkbox":
      return (
        <td>
          <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        </td>
      );
    case "dropdown":
      return (
        <td>
          <select value={value} onChange={(e) => onChange(e.target.value)}>
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

// Control panel for adding new rows and downloading table data
const ControlPanel = ({ addRow, downloadTable }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <button onClick={addRow} className="btn btn-primary me-2">
        Add Row
      </button>
      <button onClick={downloadTable} className="btn btn-secondary">
        Download Table Data
      </button>
    </div>
  );
};

export default App;
