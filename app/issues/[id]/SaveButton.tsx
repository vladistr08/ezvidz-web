'use client';

import { Button } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import axios from "axios";
import toast from "react-hot-toast";

const SaveButton = ({ issue, newStatus, newUser }: { issue: Issue, newStatus: Status, newUser: string }) => {
    const assignIssueStatus = (status: Status, user: string) => {
        axios
            .patch("/api/issues/" + issue.id, {
                status: status,
                assignedToUserId: user,
            })
            .then(() => {
                toast.success("Changes saved successfully.");
            })
            .catch(() => {
                toast.error("Changes could not be saved.");
            });
    };

    return (
        <Button onClick={() => assignIssueStatus(newStatus, newUser)}>
            Save Changes
        </Button>
    );
};

export default SaveButton;
