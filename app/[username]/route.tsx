import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import {
  QR_DARK,
  QR_GRID,
  QR_LIGHT,
  buildQrSvg,
  buildSvg,
  gradientFor,
  parseRequest,
  qrPatternFor,
} from "@/lib/avatar";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/[username]">,
) {
  const { username } = await ctx.params;
  const { seed, format, variant, size, rounded } = parseRequest(
    username,
    request.nextUrl.searchParams,
  );

  if (variant === "qr") {
    const cells = qrPatternFor(seed);

    if (format === "svg") {
      return new Response(buildQrSvg(size, rounded, cells), {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": CACHE_CONTROL,
        },
      });
    }

    const cellPercent = `${100 / QR_GRID}%`;
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
            background: QR_LIGHT,
            borderRadius: rounded,
            overflow: "hidden",
          }}
        >
          {cells.flat().map((on, i) => (
            <div
              key={i}
              style={{
                width: cellPercent,
                height: cellPercent,
                background: on ? QR_DARK : QR_LIGHT,
              }}
            />
          ))}
        </div>
      ),
      {
        width: size,
        height: size,
        headers: { "Cache-Control": CACHE_CONTROL },
      },
    );
  }

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
