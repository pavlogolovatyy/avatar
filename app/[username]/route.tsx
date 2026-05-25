import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { buildSvg, gradientFor, parseRequest } from "@/lib/avatar";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/[username]">,
) {
  const { username } = await ctx.params;
  const { seed, format, size, rounded } = parseRequest(
    username,
    request.nextUrl.searchParams,
  );
  const gradient = gradientFor(seed);

  if (format === "svg") {
    return new Response(buildSvg(size, rounded, gradient), {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": CACHE_CONTROL,
      },
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`,
          borderRadius: rounded,
        }}
      />
    ),
    {
      width: size,
      height: size,
      headers: { "Cache-Control": CACHE_CONTROL },
    },
  );
}
