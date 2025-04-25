
// Mock data based on the SQL database schema
export interface Member {
  id: number;
  member_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  gender: string;
  contact: string;
  address: string;
  email: string;
  date_created: string;
}

export interface Trainer {
  id: number;
  name: string;
  contact: string;
  email: string;
  rate: number;
}

export interface Package {
  id: number;
  package: string;
  description: string;
  amount: number;
}

export interface Plan {
  id: number;
  plan: number; // Months
  amount: number;
}

export interface Registration {
  id: number;
  member_id: number;
  plan_id: number;
  package_id: number;
  start_date: string;
  end_date: string;
  trainer_id: number;
  status: number; // 0=Inactive, 1=Active
  date_created: string;
}

export interface Payment {
  id: number;
  registration_id: number;
  amount: number;
  remarks: string;
  type: number; // 1=registration, 2=monthly
  date_created: string;
}

// Mock data
export const members: Member[] = [
  {
    id: 5,
    member_id: 58487246,
    firstname: "Mike",
    middlename: "D",
    lastname: "Williams",
    gender: "Male",
    contact: "+14526-5455-44",
    address: "Sample Address",
    email: "mwilliams@sample.com",
    date_created: "2020-10-21 13:18:19"
  },
  {
    id: 6,
    member_id: 59430244,
    firstname: "Claire",
    middlename: "D",
    lastname: "Blake",
    gender: "Female",
    contact: "+18456-5455-55",
    address: "Sample",
    email: "cblake@sample.com",
    date_created: "2020-10-21 14:57:54"
  },
  // Additional mock data
  {
    id: 7,
    member_id: 60125478,
    firstname: "John",
    middlename: "A",
    lastname: "Smith",
    gender: "Male",
    contact: "+91-9876543210",
    address: "123 Main St, Hyderabad",
    email: "john.smith@example.com",
    date_created: "2023-04-15 10:30:00"
  },
  {
    id: 8,
    member_id: 61238975,
    firstname: "Priya",
    middlename: "R",
    lastname: "Sharma",
    gender: "Female",
    contact: "+91-8765432109",
    address: "456 Park Ave, Hyderabad",
    email: "priya.sharma@example.com",
    date_created: "2023-05-22 09:45:00"
  },
  {
    id: 9,
    member_id: 62347896,
    firstname: "Raj",
    middlename: "K",
    lastname: "Patel",
    gender: "Male",
    contact: "+91-7654321098",
    address: "789 Oak St, Hyderabad",
    email: "raj.patel@example.com",
    date_created: "2023-06-10 14:20:00"
  }
];

export const trainers: Trainer[] = [
  {
    id: 1,
    name: "John Smith",
    contact: "+18456-5455-55",
    email: "jsmith@sample.com",
    rate: 500
  },
  // Additional mock data
  {
    id: 2,
    name: "Amit Kumar",
    contact: "+91-9876543211",
    email: "amit.kumar@shackfitness.com",
    rate: 600
  },
  {
    id: 3,
    name: "Deepika Reddy",
    contact: "+91-8765432108",
    email: "deepika.reddy@shackfitness.com",
    rate: 550
  },
  {
    id: 4,
    name: "Rahul Verma",
    contact: "+91-7654321097",
    email: "rahul.verma@shackfitness.com",
    rate: 520
  }
];

export const packages: Package[] = [
  {
    id: 2,
    package: "Sample Package",
    description: "Program sample + trainer",
    amount: 3500
  },
  // Additional mock data
  {
    id: 3,
    package: "Basic Fitness",
    description: "Access to gym equipment and basic guidance",
    amount: 2000
  },
  {
    id: 4,
    package: "Premium Fitness",
    description: "Full access to gym, pool, and group classes",
    amount: 4000
  },
  {
    id: 5,
    package: "Elite Training",
    description: "Personal trainer, nutrition plan, and premium access",
    amount: 6000
  }
];

export const plans: Plan[] = [
  {
    id: 1,
    plan: 12, // 12 months
    amount: 1000
  },
  // Additional mock data
  {
    id: 2,
    plan: 6, // 6 months
    amount: 600
  },
  {
    id: 3,
    plan: 3, // 3 months
    amount: 350
  },
  {
    id: 4,
    plan: 1, // 1 month
    amount: 150
  }
];

export const registrations: Registration[] = [
  {
    id: 2,
    member_id: 5,
    plan_id: 1,
    package_id: 2,
    start_date: "2020-10-21",
    end_date: "2021-10-21",
    trainer_id: 0,
    status: 0, // Inactive
    date_created: "2020-10-21"
  },
  {
    id: 3,
    member_id: 5,
    plan_id: 1,
    package_id: 2,
    start_date: "2020-10-21",
    end_date: "2021-10-21",
    trainer_id: 0,
    status: 1, // Active
    date_created: "2020-10-21"
  },
  {
    id: 4,
    member_id: 6,
    plan_id: 1,
    package_id: 2,
    start_date: "2019-10-19",
    end_date: "2020-10-19",
    trainer_id: 0,
    status: 0, // Inactive
    date_created: "2020-10-21"
  },
  {
    id: 5,
    member_id: 6,
    plan_id: 1,
    package_id: 2,
    start_date: "2020-10-21",
    end_date: "2021-10-21",
    trainer_id: 0,
    status: 1, // Active
    date_created: "2020-10-21"
  },
  // Additional mock data
  {
    id: 6,
    member_id: 7,
    plan_id: 2,
    package_id: 3,
    start_date: "2023-04-15",
    end_date: "2023-10-15",
    trainer_id: 2,
    status: 1, // Active
    date_created: "2023-04-15"
  },
  {
    id: 7,
    member_id: 8,
    plan_id: 3,
    package_id: 4,
    start_date: "2023-05-22",
    end_date: "2023-08-22",
    trainer_id: 3,
    status: 1, // Active
    date_created: "2023-05-22"
  },
  {
    id: 8,
    member_id: 9,
    plan_id: 4,
    package_id: 5,
    start_date: "2023-06-10",
    end_date: "2023-07-10",
    trainer_id: 1,
    status: 1, // Active
    date_created: "2023-06-10"
  }
];

export const payments: Payment[] = [
  {
    id: 1,
    registration_id: 2,
    amount: 4500,
    remarks: "First payment",
    type: 2, // monthly payment
    date_created: "2020-10-21 14:39:26"
  },
  {
    id: 2,
    registration_id: 2,
    amount: 3500,
    remarks: "payment for november",
    type: 2, // monthly payment
    date_created: "2020-10-21 14:39:52"
  },
  // Additional mock data
  {
    id: 3,
    registration_id: 6,
    amount: 2600,
    remarks: "Initial registration",
    type: 1, // registration
    date_created: "2023-04-15 10:35:00"
  },
  {
    id: 4,
    registration_id: 7,
    amount: 4350,
    remarks: "Registration payment",
    type: 1, // registration
    date_created: "2023-05-22 09:50:00"
  },
  {
    id: 5,
    registration_id: 7,
    amount: 4000,
    remarks: "Monthly payment - June",
    type: 2, // monthly payment
    date_created: "2023-06-01 11:25:00"
  },
  {
    id: 6,
    registration_id: 8,
    amount: 6150,
    remarks: "Full payment",
    type: 1, // registration
    date_created: "2023-06-10 14:25:00"
  }
];

// Helper function to get member name by id
export const getMemberNameById = (id: number): string => {
  const member = members.find(m => m.id === id);
  return member ? `${member.firstname} ${member.lastname}` : "Unknown";
};

// Helper function to get package name by id
export const getPackageNameById = (id: number): string => {
  const pkg = packages.find(p => p.id === id);
  return pkg ? pkg.package : "Unknown";
};

// Helper function to get plan name by id
export const getPlanNameById = (id: number): string => {
  const plan = plans.find(p => p.id === id);
  return plan ? `${plan.plan} months` : "Unknown";
};

// Helper function to get trainer name by id
export const getTrainerNameById = (id: number): string => {
  if (id === 0) return "None";
  const trainer = trainers.find(t => t.id === id);
  return trainer ? trainer.name : "Unknown";
};

// Dashboard stats 
export const getDashboardStats = () => {
  const activeMembers = registrations.filter(r => r.status === 1).length;
  const totalMembers = members.length;
  const totalTrainers = trainers.length;
  const activeRegistrations = registrations.filter(r => r.status === 1).length;
  
  // Calculate revenue for current month
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const paymentsThisMonth = payments.filter(p => {
    const paymentDate = new Date(p.date_created);
    return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
  });
  
  const revenueThisMonth = paymentsThisMonth.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Previous month revenue for comparison
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const paymentsLastMonth = payments.filter(p => {
    const paymentDate = new Date(p.date_created);
    return paymentDate.getMonth() === lastMonth && paymentDate.getFullYear() === lastMonthYear;
  });
  
  const revenueLastMonth = paymentsLastMonth.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Calculate revenue trend (percentage change)
  const revenueTrend = revenueLastMonth > 0 
    ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100 
    : 0;
  
  // Member trend
  const membersLastMonth = 4; // Mocked previous month members count
  const memberTrend = ((totalMembers - membersLastMonth) / membersLastMonth) * 100;
  
  return {
    activeMembers,
    totalMembers,
    totalTrainers,
    activeRegistrations,
    revenueThisMonth,
    revenueTrend: {
      value: Math.abs(Math.round(revenueTrend)),
      isPositive: revenueTrend >= 0
    },
    memberTrend: {
      value: Math.abs(Math.round(memberTrend)),
      isPositive: memberTrend >= 0
    }
  };
};

// Recent payments for dashboard
export const getRecentPayments = (limit: number = 5): any[] => {
  return payments
    .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
    .slice(0, limit)
    .map(payment => {
      const registration = registrations.find(r => r.id === payment.registration_id);
      const member = registration ? members.find(m => m.id === registration.member_id) : null;
      
      return {
        id: payment.id,
        amount: payment.amount,
        date: payment.date_created,
        member: member ? `${member.firstname} ${member.lastname}` : "Unknown",
        type: payment.type === 1 ? "Registration" : "Monthly",
        remarks: payment.remarks
      };
    });
};

// Recent members for dashboard
export const getRecentMembers = (limit: number = 5): Member[] => {
  return [...members]
    .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
    .slice(0, limit);
};
