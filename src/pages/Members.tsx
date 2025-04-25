
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash, Edit, Check, X } from "lucide-react";
import { members, Member } from "@/services/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Members = () => {
  const [membersList, setMembersList] = useState<Member[]>(members);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);

  // Filter members based on search term
  const filteredMembers = membersList.filter(
    (member) =>
      member.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const initialFormState = {
    id: membersList.length + 1,
    member_id: Math.floor(Math.random() * 10000000) + 50000000,
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "Male",
    contact: "",
    address: "",
    email: "",
    date_created: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<Member>(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (editMember) {
      // Update existing member
      setMembersList(
        membersList.map((m) => (m.id === editMember.id ? formData : m))
      );
      toast.success("Member updated successfully!");
      setEditMember(null);
    } else {
      // Add new member
      setMembersList([...membersList, formData]);
      toast.success("Member added successfully!");
    }
    setFormData(initialFormState);
    setOpen(false);
  };

  const handleEdit = (member: Member) => {
    setEditMember(member);
    setFormData(member);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setMembersList(membersList.filter((member) => member.id !== id));
    toast.success("Member deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Members</h2>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="hover-scale">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editMember ? "Edit Member" : "Add New Member"}</DialogTitle>
              <DialogDescription>
                {editMember
                  ? "Update member details below."
                  : "Fill in the information for the new member."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="firstname"
                    name="firstname"
                    placeholder="John"
                    value={formData.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Doe"
                    value={formData.lastname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="middlename" className="text-sm font-medium">
                  Middle Name
                </label>
                <Input
                  id="middlename"
                  name="middlename"
                  placeholder="K"
                  value={formData.middlename}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, Hyderabad"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                {editMember ? "Update Member" : "Add Member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle>Members Directory</CardTitle>
          <CardDescription>
            Manage your gym members and their information
          </CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search members..."
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
                <TableHead>Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell>{member.member_id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2 bg-primary">
                          <AvatarFallback>{member.firstname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          {member.firstname} {member.lastname}
                          <p className="text-xs text-muted-foreground">{member.address}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {member.gender}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.contact}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{new Date(member.date_created).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(member)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No members found
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

export default Members;
