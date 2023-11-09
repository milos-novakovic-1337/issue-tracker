import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!selectedIssue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={selectedIssue} />
      </Box>
      <Box>
        <EditIssueButton issueId={selectedIssue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailPage