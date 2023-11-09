import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import React from 'react'
import ReactMarkdown from 'react-markdown';


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
          <Card className="prose" mt="4">
              <ReactMarkdown>{selectedIssue.description}</ReactMarkdown>
          </Card>
      </div>
  )
}

export default IssueDetailPage