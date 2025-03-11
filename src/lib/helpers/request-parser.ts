import { NextRequest } from "next/server";

export function getSearchParam({ param, req }: { param: string; req: NextRequest }) {
    const { searchParams } = req.nextUrl;
    return searchParams.get(param)
}