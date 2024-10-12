import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NewTransaction() {
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<string>(""); // Mantém o valor como string para facilitar o input
  const [type, setType] = useState<number>(1);
  const [date, setDate] = useState<string>(""); // Data como string
  const [error, setError] = useState<string | null>(null); // Controle de erro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir reload da página

    // Validação dos campos
    if (!description || !value || !date) {
      setError("Please fill in all fields.");
      return;
    }

    const transaction = {
      type: type,
      description: description,
      value: parseFloat(value), // Garantindo que o valor seja numérico
      createdAt: new Date(date).toISOString(), // Formatação da data para ISO
    };

    try {
      const response = await fetch("http://localhost:5051/modeltransaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        console.log("Transaction created successfully", transaction);
        setError(null); // Limpa o erro após sucesso
      } else {
        setError("Failed to create transaction");
      }
    } catch (error: any) {
      setError("Error occurred: " + error.message);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">New Transaction</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Make your new transaction here.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Description
              </label>
              <Input
                id="name"
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
                onChange={(e) => setValue(e.target.value)}
                className="col-span-3"
                type="number" // Tipo de campo numérico
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
                onChange={(e) => setDate(e.target.value)} // Atualiza a data
                className="col-span-3"
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>} {/* Mensagem de erro */}
          <SheetFooter>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
