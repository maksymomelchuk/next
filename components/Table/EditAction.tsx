import { Icons } from '../icons'

export const EditAction = ({ row, table }) => {
  const meta = table.options.meta

  const setSelectedRow = (action?: string) => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }))

    meta?.revertData(row.index, action === 'cancel')
  }

  return meta?.selectedRow[row.id] ? (
    <>
      <button onClick={() => setSelectedRow('cancel')}>
        <Icons.closeMenu className="text-accent" />
      </button>{' '}
      <button onClick={() => setSelectedRow()}>
        <Icons.check className="text-green-500" />
      </button>
    </>
  ) : (
    <button onClick={() => setSelectedRow()}>
      <Icons.edit />
    </button>
  )
}
