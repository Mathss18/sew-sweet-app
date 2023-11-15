import { EditableCell } from "./editable-cell";

export const DATA = [
  {
    id: 1,
    task: "Task 1",
    due: new Date("2020-01-01"),
    status: "Done",
  },
  {
    id: 2,
    task: "Task 2",
    due: new Date("2020-01-02"),
    status: "Done",
  },
  {
    id: 3,
    task: "Task 3",
    due: new Date("2020-01-03"),
    status: "In Progress",
  },
  {
    id: 1,
    task: "Task 1",
    due: new Date("2020-01-01"),
    status: "Done",
  },
  {
    id: 2,
    task: "Task 2",
    due: new Date("2020-01-02"),
    status: "Done",
  },
  {
    id: 3,
    task: "Task 3",
    due: new Date("2020-01-03"),
    status: "In Progress",
  },
  {
    id: 1,
    task: "Task 1",
    due: new Date("2020-01-01"),
    status: "Done",
  },
  {
    id: 2,
    task: "Task 2",
    due: new Date("2020-01-02"),
    status: "Done",
  },
  {
    id: 3,
    task: "Task 3",
    due: new Date("2020-01-03"),
    status: "In Progress",
  },
  {
    id: 1,
    task: "Task 1",
    due: new Date("2020-01-01"),
    status: "Done",
  },
  {
    id: 2,
    task: "Task 2",
    due: new Date("2020-01-02"),
    status: "Done",
  },
  {
    id: 3,
    task: "Task 3",
    due: new Date("2020-01-03"),
    status: "In Progress",
  },
];

export const COLUMNS = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (props: any) => <span>{props.getValue()}</span>,
  },
  {
    accessorKey: "task",
    header: "TASK",
    cell: EditableCell,
  },
  {
    accessorKey: "due",
    header: "DUE",
    cell: (props: any) => <span>{props.getValue()?.toString()}</span>,
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: (props: any) => <span>{props.getValue()}</span>,
  }
];
