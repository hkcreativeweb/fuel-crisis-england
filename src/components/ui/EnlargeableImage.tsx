"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * An image that opens larger in a modal when clicked or tapped. Uses the native <dialog>, so Escape closes it, focus is kept
 * inside while it is open and returns to the image afterwards. Clicking outside the picture or the Close button also closes it.
 */
export function EnlargeableImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  buttonClassName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  buttonClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false); // the large copy loads only after the first open

  function open() {
    setOpened(true);
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={cn("group relative block cursor-zoom-in rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-500", buttonClassName)}
      >
        <Image src={src} alt={`${alt} Select to enlarge.`} width={width} height={height} sizes={sizes} className={className} />
        <span aria-hidden="true" className="absolute bottom-1.5 right-1.5 inline-flex items-center gap-1 rounded-full bg-navy-900/85 px-2 py-1 text-[11px] font-semibold text-white">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
          </svg>
          Enlarge
        </span>
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Enlarged cartoon"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[96dvh] w-[min(96vw,56rem)] max-w-none overflow-auto rounded-lg bg-white p-3 shadow-2xl backdrop:bg-navy-950/80 sm:p-4"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex min-h-11 items-center rounded-md bg-navy-900 px-4 text-sm font-bold text-white hover:bg-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol-500"
          >
            Close
          </button>
        </div>
        {opened ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 896px) 832px, 92vw"
            style={{ maxWidth: `min(${Math.round(width * 1.8)}px, 100%, calc(80dvh * ${width} / ${height}))` }}
            className="mx-auto mt-2 h-auto w-full rounded"
          />
        ) : null}
      </dialog>
    </>
  );
}
