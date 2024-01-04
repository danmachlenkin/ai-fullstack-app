import GetUserFromClerkID from "../../../util/auth";
import prisma from "../../../util/db";
import HistoryChart from "../../../components/HistoryChart";

const getAnalyses = async () => {
  const user = await GetUserFromClerkID;
  const analyses = await prisma.EntryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy:{
        createdAt: 'asc'
    }
  });

  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore;
  }, 0);
  const average = Math.round(total / analyses.length);

  return { analyses, average };
};

const HistoryPage = async () => {
    const { analyses, average } = await getAnalyses()
    return (
      <div className="h-full px-6 py-8">
        <div>
          <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
        </div>
        <div className="h-full w-full">
          <HistoryChart data={analyses} />
        </div>
      </div>
    )
  }

  export default HistoryPage;
