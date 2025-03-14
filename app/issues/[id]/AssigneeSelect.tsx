'use client';

import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({
                            issue,
                            setNewUser, // Accept the setNewUser function as a prop
                        }: {
    issue: Issue;
    setNewUser: (userId: string) => void; // Type for the setter function
}) => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) return <Skeleton />;

    if (error) return null;

    const assignIssue = (userId: string) => {
        // Update the parent state via setNewUser
        setNewUser(userId);

        // Make the API call to assign the user
        axios
            .patch("/api/issues/" + issue.id, {
                assignedToUserId: userId || null,
            })
            .catch(() => {
                toast.error("Changes could not be saved.");
            });
    };

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={assignIssue} // Pass the new userId to assignIssue
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="">Unassigned</Select.Item>
                        {users?.map((user) => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

const useUsers = () =>
    useQuery<User[]>({
        queryKey: ["users"],
        queryFn: () =>
            axios.get("/api/users").then((res) => res.data),
        staleTime: 60 * 1000, // 60s
        retry: 3,
    });

export default AssigneeSelect;
