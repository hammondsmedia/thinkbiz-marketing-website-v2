'use client'

import { useState } from 'react'
import type { Event } from '@/types/event'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function padDate(n: number) {
  return String(n).padStart(2, '0')
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${padDate(d.getMonth() + 1)}-${padDate(d.getDate())}`
}

interface CalCell {
  dateStr: string
  day: number
  isCurrentMonth: boolean
  isToday: boolean
}

function buildCalendarCells(year: number, month: number): CalCell[] {
  const today = toDateStr(new Date())
  const firstDayOfWeek = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: CalCell[] = []

  // Leading days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const d = new Date(year, month - 1, day)
    cells.push({ dateStr: toDateStr(d), day, isCurrentMonth: false, isToday: false })
  }

  // Current month
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day)
    const dateStr = toDateStr(d)
    cells.push({ dateStr, day, isCurrentMonth: true, isToday: dateStr === today })
  }

  // Trailing days from next month
  const totalCells = Math.ceil(cells.length / 7) * 7
  const trailing = totalCells - cells.length
  for (let day = 1; day <= trailing; day++) {
    const d = new Date(year, month + 1, day)
    cells.push({ dateStr: toDateStr(d), day, isCurrentMonth: false, isToday: false })
  }

  return cells
}

interface EventCalendarProps {
  events: Event[]
  selectedDate: string | null
  onSelectDate: (date: string | null) => void
}

export function EventCalendar({ events, selectedDate, onSelectDate }: EventCalendarProps) {
  const now = new Date()
  const [viewYear, setViewYear] = useState(now.getFullYear())
  const [viewMonth, setViewMonth] = useState(now.getMonth())

  const eventDates = new Set(events.map((e) => e.startDate.split('T')[0]))
  const cells = buildCalendarCells(viewYear, viewMonth)

  const goToPrev = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }

  const goToNext = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  const isToday = viewYear === now.getFullYear() && viewMonth === now.getMonth()

  const handleDayClick = (cell: CalCell) => {
    if (!eventDates.has(cell.dateStr)) return
    onSelectDate(selectedDate === cell.dateStr ? null : cell.dateStr)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <button
          onClick={goToPrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Previous month"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="text-center">
          <p className="font-bold text-secondary text-base leading-none">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </p>
          {!isToday && (
            <button
              onClick={() => { setViewYear(now.getFullYear()); setViewMonth(now.getMonth()) }}
              className="text-xs text-primary hover:text-secondary transition-colors mt-0.5 font-medium"
            >
              Jump to today
            </button>
          )}
        </div>

        <button
          onClick={goToNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Next month"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Day names row */}
      <div className="grid grid-cols-7 border-b border-gray-100" role="row">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-bold text-gray-400 uppercase tracking-wider" role="columnheader" aria-label={d}>
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7" role="grid" aria-label={`${MONTH_NAMES[viewMonth]} ${viewYear} calendar`}>
        {cells.map((cell) => {
          const hasEvent = eventDates.has(cell.dateStr)
          const isSelected = selectedDate === cell.dateStr
          const isClickable = hasEvent

          let cellCls = 'relative flex flex-col items-center py-2 px-1 min-h-[52px] transition-colors'
          if (!cell.isCurrentMonth) cellCls += ' opacity-30'
          if (isClickable) cellCls += ' cursor-pointer'
          else cellCls += ' cursor-default'

          let numCls = 'w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all'
          if (isSelected) numCls += ' bg-primary text-white shadow-md'
          else if (cell.isToday) numCls += ' bg-accent text-gray-900 font-black'
          else if (hasEvent && cell.isCurrentMonth) numCls += ' text-secondary font-bold hover:bg-primary/10'
          else numCls += ' text-gray-600'

          return (
            <div
              key={cell.dateStr}
              role="gridcell"
              aria-label={
                hasEvent
                  ? `${cell.dateStr}, has events${isSelected ? ', selected' : ''}`
                  : cell.dateStr
              }
              aria-selected={isSelected}
              aria-pressed={isClickable ? isSelected : undefined}
              tabIndex={isClickable ? 0 : -1}
              className={cellCls}
              onClick={() => handleDayClick(cell)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDayClick(cell) }
              }}
            >
              <span className={numCls}>{cell.day}</span>
              {hasEvent && (
                <span
                  className={`mt-0.5 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 px-5 py-3 border-t border-gray-100 bg-gray-50">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden="true" />
          Today
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" aria-hidden="true" />
          Has events
        </span>
        {selectedDate && (
          <button
            onClick={() => onSelectDate(null)}
            className="text-xs text-primary font-semibold hover:text-secondary transition-colors ml-2"
          >
            Clear filter ×
          </button>
        )}
      </div>
    </div>
  )
}
