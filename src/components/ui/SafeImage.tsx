"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * A next/image that hides itself if the file fails to load, so the container's background colour shows instead of a
 * broken-image icon. Use inside a positioned container with a background colour.
 */
export function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through props
  return <Image {...props} onError={() => setFailed(true)} />;
}
