
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Plus, Trash, Edit } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { members, trainers, getMemberNameById, getTrainerNameById } from "@/services/mockData";

// Define the schedule interface
interface Schedule {
  id: number;
  member_id: number;
  trainer_id: number;
  title: string;
  start_date: Date;
  end_date: Date;
  start_time: string;
  end_time: string;
  dow: string; // day of week
}

const Schedules = () => {
  // Sample initial schedules
  const initialSchedules: Schedule[] = [
    {
      id: 1,
      member_id: 5,
      trainer_id: 1,
      title: "Personal Training",
      start_date: new Date(2025, 3, 26),
      end_date: new Date(2025, 3, 26),
      start_time: "09:00",
      end_time: "10:00",
      dow: "Monday"
    },
    {
      id: 2,
      member_id: 6,
      trainer_id: 2,
      title: "Yoga Class",
      start_date: new Date(2025, 3, 27),
      end_date: new Date(2025, 3, 27),
      start_time: "17:00",
      end_time: "18:00",
      dow: "Tuesday"
    }
  ];

  const [schedulesList, setSchedulesList] = useState<Schedule[]>(initialSchedules);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);

  // Initial form state
  const initialFormState: Schedule = {
    id: schedulesList.length + 1,
    member_id: 0,
    trainer_id: 0,
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    start_time: "",
    end_time: "",
    dow: ""
  };

  const [formData, setFormData] = useState<Schedule>(initialFormState);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: name === "member_id" || name === "trainer_id" ? parseInt(value) : value
    });
  };

  // Handle date selection
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const dayOfWeek = format(date, 'EEEE');
      setFormData({
        ...formData,
        start_date: date,
        end_date: date,
        dow: dayOfWeek
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (editSchedule) {
      // Update existing schedule
      setSchedulesList(
        schedulesList.map((s) => (s.id === editSchedule.id ? formData : s))
      );
      toast.success("Schedule updated successfully!");
      setEditSchedule(null);
    } else {
      // Add new schedule
      setSchedulesList([...schedulesList, { ...formData, id: formData.id }]);
      toast.success("Schedule added successfully!");
    }
    setFormData(initialFormState);
    setOpen(false);
  };

  // Handle editing a schedule
  const handleEdit = (schedule: Schedule) => {
    setEditSchedule(schedule);
    setFormData(schedule);
    setOpen(true);
  };

  // Handle deleting a schedule
  const handleDelete = (id: number) => {
    setSchedulesList(schedulesList.filter((schedule) => schedule.id !== id));
    toast.success("Schedule deleted successfully!");
  };

  // Filter schedules by the selected date
  const filteredSchedules = selectedDate
    ? schedulesList.filter(
        (schedule) =>
          format(schedule.start_date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : schedulesList;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Schedules</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editSchedule ? "Edit Schedule" : "Add New Schedule"}</DialogTitle>
              <DialogDescription>
                {editSchedule
                  ? "Update schedule details below."
                  : "Fill in the information for the new schedule."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Personal Training"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="member_id" className="text-sm font-medium">
                    Member
                  </label>
                  <Select
                    value={formData.member_id.toString()}
                    onValueChange={(value) => handleSelectChange("member_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member.id} value={member.id.toString()}>
                          {member.firstname} {member.lastname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="trainer_id" className="text-sm font-medium">
                    Trainer
                  </label>
                  <Select
                    value={formData.trainer_id.toString()}
                    onValueChange={(value) => handleSelectChange("trainer_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.start_date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.start_date ? (
                        format(formData.start_date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.start_date}
                      onSelect={handleDateChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="start_time" className="text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    id="start_time"
                    name="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="end_time" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input
                    id="end_time"
                    name="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                {editSchedule ? "Update Schedule" : "Add Schedule"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-fit animate-scale-in">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>
              Select a date to view schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border pointer-events-auto"
            />
          </CardContent>
        </Card>

        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <>Schedules for {format(selectedDate, "PPPP")}</>
              ) : (
                <>All Schedules</>
              )}
            </CardTitle>
            <CardDescription>
              Manage gym schedules and training sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/30">
                  <TableHead>Title</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell>{schedule.title}</TableCell>
                      <TableCell>{getMemberNameById(schedule.member_id)}</TableCell>
                      <TableCell>{getTrainerNameById(schedule.trainer_id)}</TableCell>
                      <TableCell>
                        {format(schedule.start_date, "PP")} ({schedule.dow})
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {schedule.start_time} - {schedule.end_time}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(schedule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDelete(schedule.id)}
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
                      No schedules found for this date
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedules;
