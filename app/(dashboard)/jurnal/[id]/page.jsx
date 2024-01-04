import Editor from "../../../../components/Editor";
import GetUserFromClerkID from "../../../../util/auth";
import prisma from "../../../../util/db";

const getEntry = async (id) => {
  const user = await GetUserFromClerkID();
  const entry = await prisma.JurnalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
        analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <Editor entry={entry} />
      </div>
    </div>
  );
};

export default EntryPage;
