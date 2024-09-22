import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Sample initial data
const initialData = {
  tasks: {
    task1: { id: 'task1', content: 'Task 1' },
    task2: { id: 'task2', content: 'Task 2' },
    task3: { id: 'task3', content: 'Task 3' },
    task4: { id: 'task4', content: 'Task 4' },
  },
  columns: {
    column1: {
      id: 'column1',
      title: 'To Do',
      taskIds: ['task1', 'task2', 'task3', 'task4'],
    },
  },
  columnOrder: ['column1'],
};

const Reactdnd = () => {
  const [data, setData] = useState(initialData);

  // Function to handle reordering tasks
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = data.columns[source.droppableId];
      const newTaskIds = [...column.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      // Moving to a different column
      const sourceColumn = data.columns[source.droppableId];
      const destinationColumn = data.columns[destination.droppableId];

      const sourceTaskIds = [...sourceColumn.taskIds];
      const destinationTaskIds = [...destinationColumn.taskIds];

      sourceTaskIds.splice(source.index, 1);
      destinationTaskIds.splice(destination.index, 0, draggableId);

      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      };

      setData(newData);
    }
  };

  
  return (
    <div>
      <h1>Drag and Drop Example</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="column1" type="task">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {data.columns.column1.taskIds.map((taskId, index) => (
                <Draggable key={taskId} draggableId={taskId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {data.tasks[taskId].content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Reactdnd;
