import { useEffect } from "react";

const EnableLazyLoadingForImages = () => {
  useEffect(() => {
    const setLazyLoading = (root: ParentNode | Document = document) => {
      const images = root.querySelectorAll("img:not([loading])");
      images.forEach((img) => {
        img.setAttribute("loading", "lazy");
      });
    };

    // أول مرة الصفحة تفتح
    setLazyLoading();

    // لمراقبة أي تغييرات ديناميكية (صور جديدة انضافت للصفحة)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Node.ELEMENT_NODE
              const element = node as HTMLElement;
              if (element.tagName === "IMG" && !element.hasAttribute("loading")) {
                element.setAttribute("loading", "lazy");
              } else {
                // لو العنصر يحتوي على صور داخله (nested imgs)
                setLazyLoading(element);
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // تنظيف الـ observer لما يتم إزالة المكون (لو تغيرت الصفحة مثلا)
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default EnableLazyLoadingForImages;
