import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import Pagination from "./components/Pagination";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";

export default async function Home({ searchParams }: { searchParams: { page: string}}) {
  const open = await prisma.issue.count({ where: { status: 'OPEN'}});
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS'}});
  const closed = await prisma.issue.count({ where: { status: 'CLOSED'}});

  return (
    <Grid columns={{ initial: "1", md: "2"}}>
      <Flex direction="column">
        <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
        <IssueChart open={open} inProgress={inProgress} closed={closed}/>
      </Flex>
    <LatestIssues/>
    </Grid>
  )
}
