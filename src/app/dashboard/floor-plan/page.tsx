


'use client'

import { useFloorPlanStore } from '@/store/useFloorPlanStore'

import { Button } from '@/components/ui/button'
import DraggableTable from '@/components/draggable-table'

export default function FloorPlan() {
  const { tables, addTable } = useFloorPlanStore()

  return (
    <div className="relative w-full h-[90vh] bg-gray-100 border p-4 overflow-hidden">
      {tables.map((table) => (
        <DraggableTable key={table.id} tableId={table.id} />
      ))}
      <Button onClick={addTable} className="absolute top-2 left-2">
        ➕ Add Table
      </Button>
    </div>
  )
}


