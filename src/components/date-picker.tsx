"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) return false
    return !isNaN(date.getTime())
}

export function DatePicker({
    label = "Date",
    placeholder = "June 01, 2025",
    defaultValue,
    onChange,
    optional = false,
    error,
}: {
    label?: string
    placeholder?: string
    defaultValue?: Date
    onChange?: (date: Date | undefined) => void
    optional?: boolean,
    error?: string,
}) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(defaultValue)
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))

    return (
        <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="date" className="text-xl font-medium flex items-center gap-2">
                {label}
                {optional ? (
                    <span className="text-gray-400 ml-1">(Optional)</span>
                ) : (
                    <span className="text-red-500">*</span>
                )}
                {error && (
                    <span className="ml-1 text-red-500 text-base font-normal">
                        {error}
                    </span>
                )}
            </Label>
            <div className="relative flex gap-2 w-full">
                <Input
                    id="date"
                    value={value}
                    placeholder={placeholder}
                    className="h-14 md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring w-full"
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setValue(inputValue);

                        // If input is empty, pass undefined
                        if (!inputValue) {
                            setDate(undefined);
                            setMonth(undefined);
                            console.log("DatePicker value:", undefined); // <-- log here
                            onChange?.(undefined);
                            return;
                        }

                        const inputDate = new Date(inputValue);
                        if (isValidDate(inputDate)) {
                            setDate(inputDate);
                            setMonth(inputDate);
                            console.log("DatePicker value:", inputDate); // <-- log here
                            onChange?.(inputDate);
                        } else {
                            setDate(undefined);
                            setMonth(undefined);
                            console.log("DatePicker value:", undefined); // <-- log here
                            onChange?.(undefined);
                        }
                    }}
                // ...rest of props
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            tabIndex={-1}
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate)
                                setValue(formatDate(selectedDate))
                                setOpen(false)
                                onChange?.(selectedDate)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}