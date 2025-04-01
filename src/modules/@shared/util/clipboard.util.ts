export class ClipboardUtil {
  public static copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => console.warn("Content copied to clipboard"),
      () => console.warn("Failed to copy")
    );
  }

  public static convertHtmlToPlainText(html: string): string {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    const elements = tempElement.querySelectorAll("*");
    elements.forEach((element) => {
      element.removeAttribute("style");
    });

    const formattedText = tempElement.innerText;

    tempElement.remove();

    return formattedText;
  }
}
