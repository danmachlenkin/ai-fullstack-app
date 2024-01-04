import { revalidatePath } from 'next/cache.js';
import GetUserFromClerkID from '../../../util/auth.js';
import prisma from '../../../util/db.js';
import { NextResponse } from 'next/server';
import { analyze } from '../../../util/ai.js';

export const POST = async() => {
        const user = await GetUserFromClerkID();
        const entry = await prisma.JurnalEntry.create({
            data:{
                userId: user.id,
                content: 'Write about your day!'
            }
        })

        const analsys = await analyze(entry.content);
        await prisma.EntryAnalysis.create({
            data:{
                userId: user.id,
                entryId: entry.id,
                ...analsys,
                
            }
        })

        revalidatePath('/jurnal');

      return NextResponse.json({data: entry })
}