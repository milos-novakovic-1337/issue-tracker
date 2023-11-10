import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';
import AssigneeSelect from '@/app/api/issues/[id]/AssigneeSelect';

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const selectedIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!selectedIssue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4" >
        <IssueDetails issue={selectedIssue} />
      </Box>
      {session && (<Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={selectedIssue}/>
          <EditIssueButton issueId={selectedIssue.id} />
          <DeleteIssueButton issueId={selectedIssue.id} />
        </Flex>
      </Box>)}
    </Grid>
  )
}

export default IssueDetailPage