import GetUserFromClerkID from "../../../util/auth.js";
import prisma from "../../../util/db.js";

import Question from "../../../components/Question.jsx";
import NewEntry from "../../../components/NewEntry.jsx";
import EntryCard from "../../../components/EntryCard.jsx";
import Link from "next/link.js";

import { analyze } from "../../../util/ai.js";

const getEntries = async () => {
  let user = await GetUserFromClerkID();
  let entries = await prisma.JurnalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};

const JurnalPage = async () => {
  const data = await getEntries();
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntry />
        {data.map((entry) => (
          <Link href={`/jurnal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JurnalPage;
