import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: { id: parseInt(params.id) },
        data: {
            title: body.title,
            description: body.description
        }
    });
    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({}, { status: 401 });

    const issue = prisma.issue.findUnique(
        {
            where: { id: parseInt(params.id) }
        });
    await delay(2000);

    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    prisma.issue.delete({
        where: { id: parseInt(params.id) }
    });
};