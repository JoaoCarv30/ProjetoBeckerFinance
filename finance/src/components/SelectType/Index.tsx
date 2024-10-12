import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectTypeProps {
  value: string;
  onChange: (value: string) => void;
  valueIncome: string;
  valueExpense: string;
}

export function SelectType({ value, onChange, valueIncome, valueExpense }: SelectTypeProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-64   overflow-auto ">
        <SelectValue placeholder="Income or expense ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value={valueIncome}>Entrada</SelectItem>
          <SelectItem value={valueExpense}>Saída</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
