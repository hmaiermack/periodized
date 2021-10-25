import { Draggable, Droppable } from "react-beautiful-dnd"

interface IProps {
    id: string,
    list: IListItem[],
    backendList: IListItem[]
}

interface IListItem {
    id: string,
    name: string
}

const DropColumn = ({id, list, backendList}: IProps) => {
    return (
        <div className="min-h-droppableContainer bg-gray-400 p-4 flex flex-col justify-between">
            <Droppable droppableId={id} direction='vertical'>
                {(provided, snapshot) => {
                    return (
                        <div 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            className={`
                                ${snapshot.isDraggingOver ? 'bg-blue-400' : 'bg-gray-300'}
                                p-1 w-60 min-h-droppable space-y-2
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
                                                    select-none p-4 min-h-dndItem text-white 
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
            <button
                type="button"
                className="
                    mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    disabled:opacity-50
                    "
                onClick={() => console.log({
                    backendList,
                    list
                })}
                disabled={backendList === list || list.length === 0}
                >
                Save Changes
            </button>

        </div>
    )
}

export default DropColumn
