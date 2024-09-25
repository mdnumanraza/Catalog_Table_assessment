// components/DraggableColumn.js

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  COLUMN: "column"
};

const DraggableColumn = ({ col, index, moveColumn }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover(item) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [, drag] = useDrag({
    type: ItemTypes.COLUMN,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <th ref={ref} className="cursor-pointer text-white">
      {col.label}
    </th>
  );
};

export default DraggableColumn;
