/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="256"
          height="256"
          src="https://res.cloudinary.com/viaxco/image/upload/v1618316973/ViaxCo/logo512_i1ipua.png"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
