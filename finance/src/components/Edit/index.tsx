import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { MdEdit } from "react-icons/md";

interface EditProps {
  idTransaction: number;
  descriptionTransaction: string;
  valueTransaction: number;
  typeTransaction: number;
  dateTransaction: string;
}

export function Edit({
  idTransaction,
  descriptionTransaction,
  valueTransaction,
  typeTransaction,
  dateTransaction,
}: EditProps) {
  const [description, setDescription] = useState<string>(descriptionTransaction);
  const [value, setValue] = useState<number>(valueTransaction);
  const [type, setType] = useState<number>(typeTransaction);
  const [date, setDate] = useState<string>(dateTransaction);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para controle do modal

  const handleEdit = async (id: number) => {
    if (!description || !value || !date) {
      setError("Please fill in all fields.");
      return;
    }

    if (isNaN(value)) {
      setError("Invalid value for transaction.");
      return;
    }

    const transaction = {
      type: type,
      description: description,
      value: value,
      createdAt: new Date(date).toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:5051/modeltransaction/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        console.log("Transaction updated successfully", transaction);
        setError(null);
        setIsOpen(false); // Fecha o modal após sucesso
      } else {
        const errorResponse = await response.json();
        setError(`Failed to update transaction: ${errorResponse.message}`);
      }
    } catch (error: any) {
      setError("Error occurred: " + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}> {/* Controla a abertura do modal */}
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}> {/* Abre o modal ao clicar */}
          <MdEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Make changes to your transaction here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit(idTransaction);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="value" className="text-right">
                Value
              </label>
              <Input
                id="value"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                className="col-span-3"
                type="number"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(parseInt(e.target.value, 10))}
                className="col-span-3 border rounded p-2"
              >
                <option value={1}>Entrada</option>
                <option value={2}>Saída</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
