import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute bottom-4 right-4 bg-slate-500 hover:bg-red-400 text-white p-2 rounded-full transition">
          <Trash2 className="h-5 w-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader className="text-lg font-semibold">
          <DialogTitle>Anzeige löschen?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          Bist du sicher, dass du diese Anzeige löschen möchtest?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Löschen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
