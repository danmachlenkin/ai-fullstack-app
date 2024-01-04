import { NextResponse } from 'next/server';
import GetUserFromClerkId from '../../../../util/auth.js';
import prisma from '../../../../util/db.js';
import { analyze } from '../../../../util/ai.js';

export const PATCH = async(request,{params}) => {
    const {content} = await request.json();
    
    const user = await GetUserFromClerkId();
    const updatedEntry = await prisma.JurnalEntry.update({
        where:{
            userId_id:{
                userId: user.id,
                id: params.id
            }
        },
        data:{
            content,
        }
    })

    const updated = await analyze(updatedEntry.content);

    const output = await prisma.EntryAnalysis.upsert({
        where:{
            entryId: updatedEntry.id
        },
        create:{
            userId: user.id,
            entryId: updatedEntry.id,
            ...updated,
            
        },
        update: {
            ...updated
        }
    })


    return NextResponse.json({data: {...updatedEntry,analysis:output}})
}