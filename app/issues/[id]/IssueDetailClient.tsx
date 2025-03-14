// IssueDetailClient.tsx (Client Component)
'use client'; // Required for client-side hooks

import { useState, useEffect } from 'react';
import { Box, Flex, Grid } from '@radix-ui/themes';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import AssigneeSelect from './AssigneeSelect';
import StatusSelect from './StatusSelect';
import SaveButton from './SaveButton';
import { Status, Issue } from '@prisma/client';

interface Props {
    initialIssue: Issue;
}

const IssueDetailClient = ({ initialIssue }: Props) => {
    const [newStatus, setNewStatus] = useState<string | undefined>(initialIssue.status);
    const [newUser, setNewUser] = useState<string | undefined>(initialIssue.assignedToUserId || '');

    useEffect(() => {
        setNewStatus(initialIssue.status);
        setNewUser(initialIssue.assignedToUserId || '');
    }, [initialIssue]);

    return (
        <Grid columns={{ initial: '1', sm: '5' }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={initialIssue} />
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={initialIssue} setNewUser={setNewUser} />
                    <StatusSelect issue={initialIssue} setNewStatus={setNewStatus} />
                    <SaveButton
                        issue={initialIssue}
                        newStatus={newStatus as Status || Status.OPEN}
                        newUser={newUser || ''}
                    />
                    <EditIssueButton issueId={initialIssue.id} />
                    <DeleteIssueButton issueId={initialIssue.id} />
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailClient;
