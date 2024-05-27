import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const Box = ({ id, children, moveBox, findBox }) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { id, type: 'box' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'box',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.id;
      const hoverIndex = id;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBox(dragIndex, hoverIndex);
      item.id = hoverIndex;
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
};

export default Box;