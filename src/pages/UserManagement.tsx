import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  UserPlus,
  Save,
  X,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "staff";
  status: "active" | "inactive";
  lastLogin: string;
}

export function UserManagement() {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real production app, this would be uncommented
        // const data = await fetchData<User>('users');
        // if (data.length > 0) {
        //   setUsers(data);
        // }
        console.log("Fetching users from database...");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@school.edu",
      role: "admin",
      status: "active",
      lastLogin: "2023-06-01T09:30:00",
    },
    {
      id: "2",
      name: "John Smith",
      email: "john.smith@school.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2023-06-01T08:45:00",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah.johnson@school.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2023-05-31T15:20:00",
    },
    {
      id: "4",
      name: "Michael Brown",
      email: "michael.brown@school.edu",
      role: "staff",
      status: "active",
      lastLogin: "2023-05-31T14:10:00",
    },
    {
      id: "5",
      name: "Emily Davis",
      email: "emily.davis@school.edu",
      role: "teacher",
      status: "inactive",
      lastLogin: "2023-05-15T10:30:00",
    },
    {
      id: "6",
      name: "Robert Wilson",
      email: "robert.wilson@school.edu",
      role: "staff",
      status: "active",
      lastLogin: "2023-05-30T11:45:00",
    },
    {
      id: "7",
      name: "Jennifer Lee",
      email: "jennifer.lee@school.edu",
      role: "teacher",
      status: "active",
      lastLogin: "2023-05-31T09:15:00",
    },
    {
      id: "8",
      name: "David Miller",
      email: "david.miller@school.edu",
      role: "admin",
      status: "active",
      lastLogin: "2023-05-31T16:30:00",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const handleAddUser = () => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      email: "",
      role: "staff",
      status: "active",
      lastLogin: "",
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setUsers(users.filter((user) => user.id !== id));
      // In a real production app, this would be uncommented
      // await deleteData('users', id);
      console.log("Deleting user from database:", id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSaveUser = async () => {
    if (!currentUser?.name || !currentUser?.email) return;

    try {
      const newUser: User = {
        id: currentUser.id || Math.random().toString(36).substr(2, 9),
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role as "admin" | "teacher" | "staff",
        status: currentUser.status as "active" | "inactive",
        lastLogin: currentUser.lastLogin || new Date().toISOString(),
      };

      if (isEditing) {
        setUsers(
          users.map((user) => (user.id === newUser.id ? newUser : user)),
        );
        // In a real production app, this would be uncommented
        // await updateData('users', newUser.id, {
        //   name: newUser.name,
        //   email: newUser.email,
        //   role: newUser.role,
        //   status: newUser.status
        // });
        console.log("Updating user in database:", newUser);
      } else {
        setUsers([...users, newUser]);
        // In a real production app, this would be uncommented
        // await syncData('users', [{
        //   name: newUser.name,
        //   email: newUser.email,
        //   role: newUser.role,
        //   status: newUser.status,
        //   last_login: newUser.lastLogin
        // }]);
        console.log("Adding new user to database:", newUser);
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "teacher":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "staff":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button onClick={handleAddUser}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() +
                            user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "secondary"
                          }
                        >
                          {user.status.charAt(0).toUpperCase() +
                            user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <span
                                className={
                                  user.status === "active"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }
                              >
                                {user.status === "active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-6 text-muted-foreground"
                      >
                        No users found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={currentUser?.name || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser!, name: e.target.value })
                  }
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={currentUser?.email || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser!, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={currentUser?.role || "staff"}
                  onValueChange={(value) =>
                    setCurrentUser({
                      ...currentUser!,
                      role: value as "admin" | "teacher" | "staff",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentUser?.status || "active"}
                  onValueChange={(value) =>
                    setCurrentUser({
                      ...currentUser!,
                      status: value as "active" | "inactive",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button onClick={handleSaveUser}>
                <Save className="mr-2 h-4 w-4" /> Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

export default UserManagement;
