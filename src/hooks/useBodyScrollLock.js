import { useEffect } from "react";

/**
 * Locks body scroll when a modal/drawer is open.
 * Works correctly on iOS Safari (the tricky one).
 * Call with `useBodyScrollLock(true)` when the modal is open.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = window.scrollY;
    const body = document.body;

    // Freeze body in place (iOS technique)
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflowY = "scroll"; // keep scrollbar width to avoid layout shift

    return () => {
      // Restore scroll position on unlock
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflowY = "";
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
