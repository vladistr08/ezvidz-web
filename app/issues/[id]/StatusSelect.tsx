'use client';

import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const StatusSelect = ({
                          issue,
                          setNewStatus, // Accept the setNewStatus function as a prop
                      }: {
    issue: Issue;
    setNewStatus: (status: string) => void; // Type for the setter function
}) => {
    const assignIssueStatus = (selectedStatus: string) => {
        // Update the parent state via setNewStatus
        setNewStatus(selectedStatus);

        // Make the API call to update the status
        axios
            .patch("/api/issues/" + issue.id, {
                status: selectedStatus,
            })
            .catch(() => {
                toast.error("Changes could not be saved.");
            });
    };

    return (
        <>
            <Select.Root
                defaultValue={issue.status}
                onValueChange={assignIssueStatus} // Pass the selected status to assignIssueStatus
            >
                <Select.Trigger placeholder="Assign..." />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        {statuses?.map((status) => (
                            <Select.Item key={status.value} value={status.value}>
                                {status.label}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    );
};

export default StatusSelect;
