
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash, Edit } from "lucide-react";
import { trainers, Trainer } from "@/services/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Trainers = () => {
  const [trainersList, setTrainersList] = useState<Trainer[]>(trainers);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editTrainer, setEditTrainer] = useState<Trainer | null>(null);

  // Filter trainers based on search term
  const filteredTrainers = trainersList.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const initialFormState = {
    id: trainersList.length + 1,
    name: "",
    contact: "",
    email: "",
    rate: 0,
  };

  const [formData, setFormData] = useState<Trainer>(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rate" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = () => {
    if (editTrainer) {
      // Update existing trainer
      setTrainersList(
        trainersList.map((t) => (t.id === editTrainer.id ? formData : t))
      );
      toast.success("Trainer updated successfully!");
      setEditTrainer(null);
    } else {
      // Add new trainer
      setTrainersList([...trainersList, formData]);
      toast.success("Trainer added successfully!");
    }
    setFormData(initialFormState);
    setOpen(false);
  };

  const handleEdit = (trainer: Trainer) => {
    setEditTrainer(trainer);
    setFormData(trainer);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setTrainersList(trainersList.filter((trainer) => trainer.id !== id));
    toast.success("Trainer deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Trainers</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Trainer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editTrainer ? "Edit Trainer" : "Add New Trainer"}</DialogTitle>
              <DialogDescription>
                {editTrainer
                  ? "Update trainer details below."
                  : "Fill in the information for the new trainer."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact" className="text-sm font-medium">
                  Contact
                </label>
                <Input
                  id="contact"
                  name="contact"
                  placeholder="+91 98765-43210"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rate" className="text-sm font-medium">
                  Hourly Rate (₹)
                </label>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  placeholder="500"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                {editTrainer ? "Update Trainer" : "Add Trainer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>Trainers Directory</CardTitle>
          <CardDescription>
            Manage your gym trainers and their information
          </CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/30">
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainers.length > 0 ? (
                filteredTrainers.map((trainer) => (
                  <TableRow key={trainer.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell>{trainer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2 bg-shack-deep-purple">
                          <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {trainer.name}
                      </div>
                    </TableCell>
                    <TableCell>{trainer.contact}</TableCell>
                    <TableCell>{trainer.email}</TableCell>
                    <TableCell>₹{trainer.rate.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(trainer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(trainer.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No trainers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trainers;
