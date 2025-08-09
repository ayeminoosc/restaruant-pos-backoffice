
'use client'

import { useRef, useEffect } from 'react'
import { useFloorPlanStore } from '@/store/useFloorPlanStore'

export default function DraggableTable({ tableId }) {
  const table = useFloorPlanStore((state) =>
    state.tables.find((t) => t.id === tableId)
  )
  const updateTable = useFloorPlanStore((state) => state.updateTable)

  const tableRef = useRef(null)
  const isDragging = useRef(false)
  const isResizing = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const initial = useRef({})

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!table) return

      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y

      if (isDragging.current) {
        updateTable(table.id, {
          x: initial.current.x + dx,
          y: initial.current.y + dy,
        })
      } else if (isResizing.current) {
        updateTable(table.id, {
          width: Math.max(40, initial.current.width + dx),
          height: Math.max(40, initial.current.height + dy),
        })
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
      isResizing.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [table, updateTable])

  if (!table) return null

  const startDrag = (e) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    initial.current = { x: table.x, y: table.y }
  }

  const startResize = (e) => {
    e.stopPropagation()
    isResizing.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    initial.current = { width: table.width, height: table.height }
  }

  return (
    <div
      ref={tableRef}
      onMouseDown={startDrag}
      className="absolute bg-white border border-gray-400 rounded shadow cursor-move z-50 select-none"
      style={{
        top: table.y,
        left: table.x,
        width: table.width,
        height: table.height,
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        <span className="pointer-events-none">Table</span>
        <div
          onMouseDown={startResize}
          className="absolute bottom-1 right-1 w-3 h-3 bg-blue-500 cursor-se-resize"
        ></div>
      </div>
    </div>
  )
}


