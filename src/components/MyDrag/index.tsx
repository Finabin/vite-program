import React from "react";

import MyDragList from "../MyDragList";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

export default function MyDrag() {

    const dataList = [
        {
            id: 1,
            city: "北京",
        },
        {
            id: 2,
            city: "上海",
        },
        {
            id: 3,
            city: "广州",
        },
        {
            id: 4,
            city: "深圳",
        },
        {
            id: 5,
            city: "杭州",
        },
        {
            id: 6,
            city: "成都",
        },
        {
            id: 7,
            city: "武汉",
        },
        {
            id: 8,
            city: "重庆",
        },
        {
            id: 9,
            city: "西安",
        },
    ]

    const [data, setData] = React.useState(dataList)

    // 获取拖拽的索引
    const getMoveIndex = (array: any, dragItem: any) => {
        const { active, over } = dragItem;
        const activeIndex = array.findIndex((item: any) => item.id === active.id);
        const overIndex = array.findIndex((item: any) => item.id === over?.id);

        // 处理未找到索引的情况
        return {
            activeIndex: activeIndex !== -1 ? activeIndex : 0,
            overIndex: overIndex !== -1 ? overIndex : activeIndex,
        };
    };

    // 拖拽结束事件
    const dragEndEvent = (dragItem: any) => {
        // active: 拖拽的元素, over: 放置(覆盖)的元素
        const { active, over } = dragItem;
        if (!active || !over) return; // 处理边界情况

        const moveDataList = [...data];
        const { activeIndex, overIndex } = getMoveIndex(moveDataList, dragItem);

        if (activeIndex !== overIndex) {
            const newDataList = arrayMove(moveDataList, activeIndex, overIndex);
            setData(newDataList);
            console.log(newDataList);
        }
    };

    return (
        <div>
            {/* modifiers 拖拽方向  */}
            <DndContext onDragEnd={dragEndEvent} modifiers={[restrictToParentElement]}>
                <SortableContext items={data.map((item) => item.id)}
                    strategy={rectSortingStrategy}>
                    {
                        data.map((item, index) => {
                            return (
                                <MyDragList id={item.id} city={item.city} key={item.id} />
                            )
                        })
                    }
                </SortableContext>
            </DndContext>
        </div>
    );
}