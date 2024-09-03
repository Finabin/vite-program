import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";  //平滑过渡动画包

export default function MyDragList(props: any) {

    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: props.id,
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
            <div>{props.id}</div>
            <div>{props.city}</div>
        </div>
    );
}