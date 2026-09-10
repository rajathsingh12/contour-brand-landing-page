export function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('contour-theme');
        if (t && ['burgundy','sage','midnight','ember'].includes(t)) {
          document.documentElement.setAttribute('data-theme', t);
        }
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
