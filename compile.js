/**
 * 编译模板：利用ES6的模板字符串进行模板编译
 *
 * @param  {string} template   模板字符串
 * @return {string} script 编译后的模板
 */
function compile(template) {
    var evalExpr = /<%=(.+?)%>/g;
    var expr = /<%([\s\S]+?)%>/g;

    template = template
        .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
        .replace(expr, '`); \n $1 \n  echo(`');

    template = 'echo(`' + template + '`);';

    var script =
        `(function parse(data) {
            var output = "";

            function echo(html) {
                output += html;
            }

            ${ template }

            return output;
        })
    `;

    return script;
}