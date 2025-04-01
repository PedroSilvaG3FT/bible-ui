/**
 * Smoothly scrolls to a specific element with an optional offset.
 *
 * @param element The target element to scroll to. Can be a React ref or a DOM element.
 * @param offset The offset in pixels (default is 0, use negative values to scroll up).
 * @param behavior The scroll behavior (default is "smooth").
 */
export function scrollToElement(
  element: React.RefObject<HTMLElement> | HTMLElement | null,
  offset: number = 0,
  behavior: ScrollBehavior = "smooth"
) {
  if (!element) return;

  const targetElement =
    element instanceof HTMLElement ? element : element.current;

  if (targetElement) {
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: behavior,
    });
  }
}
