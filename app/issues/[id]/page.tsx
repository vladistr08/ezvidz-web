import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { cache } from 'react';
import IssueDetailClient from "@/app/issues/[id]/IssueDetailClient";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId }}));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
      <IssueDetailClient initialIssue={issue} />
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage;
