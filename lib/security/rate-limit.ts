import { env } from "@/lib/misc/env";
import arcjet, { ArcjetNextRequest, slidingWindow } from "@arcjet/next";

const authenticatedSlidingWindowRateLimit = arcjet({
    key: env.ARCJET_KEY,
    characteristics: ["ip.src", "userUuid"],
    rules: [
        slidingWindow({
            mode: "LIVE",
            interval: 60,
            max: 30,
        }),
    ],
});

const unauthenticatedSlidingWindowRateLimit = arcjet({
    key: env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        slidingWindow({
            mode: "LIVE",
            interval: 60,
            max: 5,
        }),
    ],
});

export const authenticatedRateLimit = async (req: ArcjetNextRequest, userUuid: string): Promise<[boolean, string | null]> => {
    const decision = await authenticatedSlidingWindowRateLimit.protect(req, { userUuid });

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            if (decision.conclusion === "DENY") {
                return [false, "Too many attempts. Please try again later."];
            }
        }
    }

    return [true, null];
};
export const unauthenticatedRateLimit = async (req: ArcjetNextRequest): Promise<[boolean, string | null]> => {
    const decision = await unauthenticatedSlidingWindowRateLimit.protect(req);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            if (decision.conclusion === "DENY") {
                return [false, "Too many attempts. Please try again later."];
            }
        }
    }

    return [true, null];
};