import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Search, UserPlus, Save, X, MoreHorizontal, } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
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
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);
    const [users, setUsers] = useState([
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
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
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
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setIsDialogOpen(true);
    };
    const handleDeleteUser = async (id) => {
        try {
            setUsers(users.filter((user) => user.id !== id));
            // In a real production app, this would be uncommented
            // await deleteData('users', id);
            console.log("Deleting user from database:", id);
        }
        catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    const handleSaveUser = async () => {
        if (!currentUser?.name || !currentUser?.email)
            return;
        try {
            const newUser = {
                id: currentUser.id || Math.random().toString(36).substr(2, 9),
                name: currentUser.name,
                email: currentUser.email,
                role: currentUser.role,
                status: currentUser.status,
                lastLogin: currentUser.lastLogin || new Date().toISOString(),
            };
            if (isEditing) {
                setUsers(users.map((user) => (user.id === newUser.id ? newUser : user)));
                // In a real production app, this would be uncommented
                // await updateData('users', newUser.id, {
                //   name: newUser.name,
                //   email: newUser.email,
                //   role: newUser.role,
                //   status: newUser.status
                // });
                console.log("Updating user in database:", newUser);
            }
            else {
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
        }
        catch (error) {
            console.error("Error saving user:", error);
        }
    };
    const formatDate = (dateString) => {
        if (!dateString)
            return "Never";
        const date = new Date(dateString);
        return (date.toLocaleDateString() +
            " at " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });
    const getRoleBadgeColor = (role) => {
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
    return (_jsx(DashboardLayout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "User Management" }), _jsxs(Button, { onClick: handleAddUser, children: [_jsx(UserPlus, { className: "mr-2 h-4 w-4" }), " Add User"] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Users" }), _jsx(CardDescription, { children: "Manage user accounts and permissions" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4 mb-6", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search users...", className: "pl-9", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsxs(Select, { value: roleFilter, onValueChange: setRoleFilter, children: [_jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: _jsx(SelectValue, { placeholder: "Filter by role" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Roles" }), _jsx(SelectItem, { value: "admin", children: "Admin" }), _jsx(SelectItem, { value: "teacher", children: "Teacher" }), _jsx(SelectItem, { value: "staff", children: "Staff" })] })] })] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Role" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Last Login" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsxs(TableBody, { children: [filteredUsers.map((user) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: user.name }), _jsx(TableCell, { children: user.email }), _jsx(TableCell, { children: _jsx(Badge, { className: getRoleBadgeColor(user.role), children: user.role.charAt(0).toUpperCase() +
                                                                        user.role.slice(1) }) }), _jsx(TableCell, { children: _jsx(Badge, { variant: user.status === "active" ? "default" : "secondary", children: user.status.charAt(0).toUpperCase() +
                                                                        user.status.slice(1) }) }), _jsx(TableCell, { children: formatDate(user.lastLogin) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", children: [_jsx(MoreHorizontal, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Open menu" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => handleEditUser(user), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), "Edit"] }), _jsxs(DropdownMenuItem, { onClick: () => handleDeleteUser(user.id), children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"] }), _jsx(DropdownMenuItem, { children: _jsx("span", { className: user.status === "active"
                                                                                            ? "text-red-500"
                                                                                            : "text-green-500", children: user.status === "active"
                                                                                            ? "Deactivate"
                                                                                            : "Activate" }) })] })] }) })] }, user.id))), filteredUsers.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-6 text-muted-foreground", children: "No users found matching your criteria" }) }))] })] }) })] })] }), _jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isEditing ? "Edit User" : "Add New User" }) }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name" }), _jsx(Input, { id: "name", value: currentUser?.name || "", onChange: (e) => setCurrentUser({ ...currentUser, name: e.target.value }), placeholder: "Enter full name" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: currentUser?.email || "", onChange: (e) => setCurrentUser({ ...currentUser, email: e.target.value }), placeholder: "Enter email address" })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "role", children: "Role" }), _jsxs(Select, { value: currentUser?.role || "staff", onValueChange: (value) => setCurrentUser({
                                                    ...currentUser,
                                                    role: value,
                                                }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select role" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "admin", children: "Administrator" }), _jsx(SelectItem, { value: "teacher", children: "Teacher" }), _jsx(SelectItem, { value: "staff", children: "Staff" })] })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: currentUser?.status || "active", onValueChange: (value) => setCurrentUser({
                                                    ...currentUser,
                                                    status: value,
                                                }), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsDialogOpen(false), children: [_jsx(X, { className: "mr-2 h-4 w-4" }), " Cancel"] }), _jsxs(Button, { onClick: handleSaveUser, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), " Save"] })] })] }) })] }) }));
}
export default UserManagement;
