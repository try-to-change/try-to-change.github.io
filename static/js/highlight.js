/**
 * 借助 hexo-renderer-marked 扩展，自定义渲染 code
 * ref：https://github.com/hexojs/hexo-renderer-marked/blob/master/README.md#extensibility
 */

const prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');
loadLanguages();

const escapeHtml = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag),
  );

hexo.extend.filter.register('marked:renderer', function (renderer) {
  // 定义 renderer.code 来自定义代码块的解析行为
  renderer.code = (sourceCode, language) => {
    const codeResult =
      prism.languages[language] && sourceCode
        ? prism.highlight(sourceCode, prism.languages[language])
        : escapeHtml(sourceCode);

    return `<pre class="line-numbers language-${language}"><code>${codeResult}</code></pre>`;
  };
});