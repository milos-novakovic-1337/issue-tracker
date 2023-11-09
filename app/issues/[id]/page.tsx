import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'


interface Props {
    params: { id: string}
}

const IssueDetailPage = async ({ params }:  Props) => {
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!selectedIssue) notFound();

  return (
      <div>
          <Heading>{selectedIssue.title}</Heading>
          <Flex className="space-x-3" my="2">
              <IssueStatusBadge status={selectedIssue.status} />
              <Text>{selectedIssue.createdAt.toDateString()}</Text>
          </Flex>
          <Card>
              <p>{selectedIssue.description}</p>
          </Card>
      </div>
  )
}

export default IssueDetailPage