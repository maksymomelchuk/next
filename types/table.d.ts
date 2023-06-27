// declare module '@tanstack/react-table' {
//   interface TableMeta<TData extends RowData> {
//     selectedRow: { [key: string]: boolean }
//     setSelectedRow: React.Dispatch<SetStateAction<{ [key: string]: boolean }>>
//     updateData: (rowIndex: number, columnId: string, value: string) => void
//     saveData: (updatedRow: T) => void
//     revertData: (rowIndex: number) => void
//     validation: (index: number) => true | undefined
//     updateFunction: UseMutateAsyncFunction<
//       AxiosResponse<any, any>,
//       unknown,
//       {
//         id: number
//         data: T
//       },
//       unknown
//     >
//     data: T[]
//   }
//   interface ColumnMeta<TData extends RowData, TValue> {
//     type?: string
//     options?: {
//       label: string
//       value: string
//     }[]
//   }
// }
