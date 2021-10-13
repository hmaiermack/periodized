import { Draggable, Droppable } from "react-beautiful-dnd"

interface IProps {
    id: string,
    list: IListItem[],
}

interface IListItem {
    id: string,
    name: string
}

const DragColumn = ({id, list}: IProps) => {
    return (
        <Droppable droppableId={id} direction='vertical' isDropDisabled={true}>
            {(provided, snapshot) => {
                return (
                    <div 
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        className={`
                            ${snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-gray-400'}
                            p-1 w-60 h-96
                        `}
                    >
                        {
                            list.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div 
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={`
                                                ${snapshot.isDragging ? 'bg-red-400' : 'bg-green-400'}
                                                select-none p-4 mb-2 min-h-dndItem text-white 
                                                `}
                                            style={{
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                                {item.name}
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
}

export default DragColumn
