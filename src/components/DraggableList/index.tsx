import { FC, useEffect, useState } from "react";
import type { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import "./index.less";
import DraggableItem from "../DragableItem";

type ImgItem = {
  id: number;
  url: string;
};

const DraggableList: FC = () => {
  const [list, setList] = useState<ImgItem[]>([]);

  useEffect(() => {
    setList(
      Array.from({ length: 31 }, (_, index) => ({
        id: index + 1,
        url: String(index),
      }))
    );
  }, []);

  const getMoveIndex = (array: ImgItem[], dragItem: DragMoveEvent) => {
    const { active, over } = dragItem;
    const activeIndex = array.findIndex((item) => item.id === active.id);
    const overIndex = array.findIndex((item) => item.id === over?.id);

    // 处理未找到索引的情况
    return {
      activeIndex: activeIndex !== -1 ? activeIndex : 0,
      overIndex: overIndex !== -1 ? overIndex : activeIndex,
    };
  };

  const dragEndEvent = (dragItem: DragEndEvent) => {
    const { active, over } = dragItem;
    if (!active || !over) return; // 处理边界情况

    const moveDataList = [...list];
    const { activeIndex, overIndex } = getMoveIndex(moveDataList, dragItem);

    if (activeIndex !== overIndex) {
      const newDataList = arrayMove(moveDataList, activeIndex, overIndex);
      setList(newDataList);
    }
  };

  return (
    <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
      <SortableContext
        items={list.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        <div className="drag-container">
          {list.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
