import prisma from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'


interface Props {
    params: { id: string}
}

const IssueDetailPage = async ({ params }:  Props) => {
  if (typeof params.id !== 'number')
    notFound();
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!selectedIssue) notFound();

  return (
    <div>
        <p>{selectedIssue.title}</p>
        <p>{selectedIssue.description}</p>
        <p>{selectedIssue.status}</p>
        <p>{selectedIssue.createdAt.toDateString()}</p>

    </div>
  )
}

export default IssueDetailPage