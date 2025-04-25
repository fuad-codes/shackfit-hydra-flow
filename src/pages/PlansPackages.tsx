
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Trash, Edit, Package, Calendar } from "lucide-react";
import { packages, plans, Package as PackageType, Plan } from "@/services/mockData";

const PlansPackages = () => {
  // Plans state
  const [plansList, setPlansList] = useState<Plan[]>(plans);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [openPlanDialog, setOpenPlanDialog] = useState(false);
  
  // Packages state
  const [packagesList, setPackagesList] = useState<PackageType[]>(packages);
  const [editPackage, setEditPackage] = useState<PackageType | null>(null);
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  
  // Initial form states
  const initialPlanState = {
    id: plansList.length + 1,
    plan: 0,
    amount: 0
  };
  
  const initialPackageState = {
    id: packagesList.length + 1,
    package: "",
    description: "",
    amount: 0
  };
  
  // Form states
  const [planForm, setPlanForm] = useState<Plan>(initialPlanState);
  const [packageForm, setPackageForm] = useState<PackageType>(initialPackageState);
  
  // Plan handlers
  const handlePlanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanForm({
      ...planForm,
      [name]: name === "plan" || name === "amount" ? parseFloat(value) : value,
    });
  };
  
  const handleAddEditPlan = () => {
    if (editPlan) {
      // Update existing plan
      setPlansList(plansList.map(p => p.id === editPlan.id ? planForm : p));
      toast.success("Plan updated successfully!");
      setEditPlan(null);
    } else {
      // Add new plan
      setPlansList([...plansList, planForm]);
      toast.success("Plan added successfully!");
    }
    setPlanForm(initialPlanState);
    setOpenPlanDialog(false);
  };
  
  const handleEditPlan = (plan: Plan) => {
    setEditPlan(plan);
    setPlanForm(plan);
    setOpenPlanDialog(true);
  };
  
  const handleDeletePlan = (id: number) => {
    setPlansList(plansList.filter(p => p.id !== id));
    toast.success("Plan deleted successfully!");
  };
  
  // Package handlers
  const handlePackageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPackageForm({
      ...packageForm,
      [name]: name === "amount" ? parseFloat(value) : value,
    });
  };
  
  const handleAddEditPackage = () => {
    if (editPackage) {
      // Update existing package
      setPackagesList(packagesList.map(p => p.id === editPackage.id ? packageForm : p));
      toast.success("Package updated successfully!");
      setEditPackage(null);
    } else {
      // Add new package
      setPackagesList([...packagesList, packageForm]);
      toast.success("Package added successfully!");
    }
    setPackageForm(initialPackageState);
    setOpenPackageDialog(false);
  };
  
  const handleEditPackage = (pkg: PackageType) => {
    setEditPackage(pkg);
    setPackageForm(pkg);
    setOpenPackageDialog(true);
  };
  
  const handleDeletePackage = (id: number) => {
    setPackagesList(packagesList.filter(p => p.id !== id));
    toast.success("Package deleted successfully!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Plans & Packages</h2>
      </div>
      
      <Tabs defaultValue="plans" className="animate-scale-in">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="plans" className="text-base">
            <Calendar className="mr-2 h-4 w-4" />
            Membership Plans
          </TabsTrigger>
          <TabsTrigger value="packages" className="text-base">
            <Package className="mr-2 h-4 w-4" />
            Service Packages
          </TabsTrigger>
        </TabsList>
        
        {/* Plans Tab */}
        <TabsContent value="plans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Membership Plans</CardTitle>
                <CardDescription>
                  Manage your gym membership plans and durations
                </CardDescription>
              </div>
              
              <Dialog open={openPlanDialog} onOpenChange={setOpenPlanDialog}>
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{editPlan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
                    <DialogDescription>
                      {editPlan
                        ? "Update plan details below."
                        : "Fill in the information for the new membership plan."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="plan" className="text-sm font-medium">
                        Duration (Months)
                      </label>
                      <Input
                        id="plan"
                        name="plan"
                        type="number"
                        placeholder="12"
                        value={planForm.plan}
                        onChange={handlePlanInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium">
                        Monthly Fee (₹)
                      </label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="1000"
                        value={planForm.amount}
                        onChange={handlePlanInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenPlanDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddEditPlan}>
                      {editPlan ? "Update Plan" : "Add Plan"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/30">
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Monthly Fee</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plansList.length > 0 ? (
                    plansList.map((plan) => (
                      <TableRow key={plan.id} className="hover:bg-accent/50 transition-colors">
                        <TableCell>{plan.id}</TableCell>
                        <TableCell>{plan.plan} months</TableCell>
                        <TableCell>₹{plan.amount.toLocaleString()}</TableCell>
                        <TableCell>₹{(plan.plan * plan.amount).toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditPlan(plan)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeletePlan(plan.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No plans found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Packages Tab */}
        <TabsContent value="packages">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Packages</CardTitle>
                <CardDescription>
                  Manage your gym service packages and pricing
                </CardDescription>
              </div>
              
              <Dialog open={openPackageDialog} onOpenChange={setOpenPackageDialog}>
                <DialogTrigger asChild>
                  <Button className="hover-scale">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{editPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
                    <DialogDescription>
                      {editPackage
                        ? "Update package details below."
                        : "Fill in the information for the new service package."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="package" className="text-sm font-medium">
                        Package Name
                      </label>
                      <Input
                        id="package"
                        name="package"
                        placeholder="Premium Fitness"
                        value={packageForm.package}
                        onChange={handlePackageInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Full access to gym, pool, and group classes"
                        value={packageForm.description}
                        onChange={handlePackageInputChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="amount" className="text-sm font-medium">
                        Amount (₹)
                      </label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="4000"
                        value={packageForm.amount}
                        onChange={handlePackageInputChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenPackageDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" onClick={handleAddEditPackage}>
                      {editPackage ? "Update Package" : "Add Package"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/30">
                    <TableHead className="w-12">ID</TableHead>
                    <TableHead>Package Name</TableHead>
                    <TableHead className="w-96">Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packagesList.length > 0 ? (
                    packagesList.map((pkg) => (
                      <TableRow key={pkg.id} className="hover:bg-accent/50 transition-colors">
                        <TableCell>{pkg.id}</TableCell>
                        <TableCell>{pkg.package}</TableCell>
                        <TableCell>{pkg.description}</TableCell>
                        <TableCell>₹{pkg.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditPackage(pkg)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeletePackage(pkg.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        No packages found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlansPackages;
