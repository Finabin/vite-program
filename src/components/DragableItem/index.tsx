import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./index.less";

type ImgItem = {
  id: number;
  url: string;
};

type DraggableItemProps = {
  item: ImgItem;
};

const DraggableItem: FC<DraggableItemProps> = ({ item }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: item.id,
      transition: {
        duration: 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const styles = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={styles}
      className="draggable-item"
    >
      <span>{item.url}</span>
    </div>
  );
};

export default DraggableItem;
