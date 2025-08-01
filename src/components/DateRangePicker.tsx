/**
 * @author Healium Digital
 * Date Range Picker Component
 * Handles date range selection for filtering analytics data
 */

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateRangePickerProps {
  date?: { from: Date; to: Date };
  setDate?: (date: { from: Date; to: Date }) => void;
  dateRange?: { from: Date; to: Date };
  onDateRangeChange?: (date: { from: Date; to: Date }) => void;
}

export function DateRangePicker({ 
  date, 
  setDate, 
  dateRange, 
  onDateRangeChange 
}: DateRangePickerProps) {
  // Use either date/setDate or dateRange/onDateRangeChange props
  const currentDate = date || dateRange || { 
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date() 
  };
  const currentSetDate = setDate || onDateRangeChange || (() => {});

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-amber-100">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(currentDate.from, "MM/dd/yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={currentDate.from}
            onSelect={(newDate) => newDate && currentSetDate({ ...currentDate, from: newDate })}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-amber-100">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(currentDate.to, "MM/dd/yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={currentDate.to}
            onSelect={(newDate) => newDate && currentSetDate({ ...currentDate, to: newDate })}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}