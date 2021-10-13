import { useState } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { useParams } from "react-router-dom"
import DropColumn from "../components/drag-and-drop/DropColumn"
import { useGetProgramById } from "../shared/queries/useGetProgramById"
import { reorder } from "../shared/dnd-helpers/reorder"
import DragColumn from "../components/drag-and-drop/DragColumn"

type Params = {
    id: string
}

const dummyTrainingBlocks = [
    { id: 'trainingBlock1', name: 'Training Block 1'},
    { id: 'trainingBlock2', name: 'Training Block 2'},
    { id: 'trainingBlock3', name: 'Training Block 3'},
]


const dummyCols: IColumnItems = {
    'dropColumn': {
        name: 'Drop Column',
        items: []
    },
    'dragColumn': {
        name: 'Drag Column',
        items: [...dummyTrainingBlocks]
    }
}
interface IColumnListItem {
    id: string,
    name: string
}

interface IColumnItems {
    [index: string]: {
        name: string,
        items: IColumnListItem[]
    }
}


const EditProgramPage = () => {
    let { id } = useParams<Params>()

    const [columns, setColumns] = useState(dummyCols)


    const { data, isFetching, isError, error } = useGetProgramById(id)

    const onDragEnd = ( { destination, source}: DropResult ) => {
        if (!destination) return

        if (destination.droppableId === 'dragColumn') return

        if (source.droppableId !== destination.droppableId) {
            //get dragged item from dragColumn
            //need to create a true copy otherwise the original item at source.index is also changed
            //????????????????????
            const draggedItem = Object.assign({}, columns['dragColumn'].items[source.index])
            //change id of draggedItem so that react-beautiful-dnd can tell the difference between the items of the two columns
            draggedItem.id = Date.now().toString()
            const destColumn = columns['dropColumn']
            const destItems = [...destColumn.items]
            destItems.splice(destination.index, 0, draggedItem)
            setColumns({
                ...columns,
                'dropColumn': {
                    ...destColumn,
                    items: destItems
                }
            })
        } else {
            //else if drag and dropping within the same column: reorder
            const column = columns['dropColumn']
            const reorderedItems = reorder(columns['dropColumn'].items, source.index, destination.index)
            console.log(reorderedItems);
            setColumns({
                ...columns,
                'dropColumn':{ 
                    ...column,
                    items: reorderedItems
                }
            })
        }
    }

    return (
        <div className="min-w-full min-h-full p-8">
            <h1 className="text-2xl text-center font-bold uppercase">{data && data.program.name}</h1>
            <div className="flex flex-col py-8 items-center space-y-8 md:flex-row-reverse md:justify-around md:space-y-0">
                <DragDropContext onDragEnd={onDragEnd}>
                <DragColumn id='dragColumn' list={columns.dragColumn.items} />
                <DropColumn id='dropColumn' list={columns.dropColumn.items} />
                </DragDropContext>
            </div>
        </div>
    )
}

export default EditProgramPage
