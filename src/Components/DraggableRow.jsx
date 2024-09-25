// components/DraggableRow.js

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ROW: "row"
};

const DraggableRow = ({ row, index, moveRow, columns, handleCellChange }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [, drag] = useDrag({
    type: ItemTypes.ROW,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <tr ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {columns.map((col, colIndex) => (
        <td key={colIndex}>
          <input
            type={col.type === "checkbox" ? "checkbox" : "text"}
            value={col.type === "checkbox" ? undefined : row[col.label]}
            checked={col.type === "checkbox" ? row[col.label] : undefined}
            onChange={(e) =>
              handleCellChange(index, col.label, col.type === "checkbox" ? e.target.checked : e.target.value)
            }
          />
        </td>
      ))}
    </tr>
  );
};

export default DraggableRow;
