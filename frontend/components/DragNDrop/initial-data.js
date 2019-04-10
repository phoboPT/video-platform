const initialData = {
  columnOrder: ["column-1", "column-2", "column-3"],
  columns: {
    "column-1": {
      id: "column-1",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6"],
      title: "To Do",
    },
    "column-2": {
      id: "column-2",
      taskIds: [],
      title: "In Progress",
    },
    "column-3": {
      id: "column-3",
      taskIds: [],
      title: "To Do",
    },
  },
  tasks: {
    "task-1": { content: "Take Out the garbage", id: "task-1" },
    "task-2": { content: "Watch my favourite show", id: "task-2" },
    "task-3": { content: "Charge My Phone", id: "task-3" },
    "task-4": { content: "Cook Dinner", id: "task-4" },
    "task-5": { content: "Walk Dog", id: "task-5" },
    "task-6": { content: "Take a Shower", id: "task-6" },
  },
};

export default initialData;
