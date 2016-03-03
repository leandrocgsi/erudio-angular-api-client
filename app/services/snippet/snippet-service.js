angular.module('erudioApp').service('snippetService', function(){
        var self = this;
        var commomJSTagsRGX = / debugger | eval | export | function | get | set | undefined | var | Infinity | NaN/g;
        var commomHTMLTagsRGX = /^\s*</;
        var beautifyConfigs = {
            'indent_inner_html': true,
            'indent_size': 2,
            'indent_char': ' ',
            'wrap_line_length': 78,
            'brace_style': 'expand',
            'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
            'preserve_newlines': true,
            'max_preserve_newlines': 5,
            'indent_handlebars': true,
            'extra_liners': ['/html']
        };

        self.beautifyMyCode = function (uncompiledCode) {
            console.log('entrou no service');
           
            var beautified;
            var prettified;
            var isHtml = commomHTMLTagsRGX.test(uncompiledCode);
            var isJs = commomJSTagsRGX.test(uncompiledCode);

            if (isHtml) {
                beautified = html_beautify(uncompiledCode, beautifyConfigs);
                beautified = self.replaceHTML(beautified);
            } else {

                if (isJs) {
                    beautified = js_beautify(self.replaceJs(uncompiledCode), beautifyConfigs);
                } else {
                    beautified = css_beautify(uncompiledCode);
                }
            }

            return beautified;
        }

        self.replaceHTML = function(htmlCode) {
            if (htmlCode) {
                return htmlCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            };
            return htmlCode;
        }
        self.replaceJs = function(jsCode) {
            if (jsCode) {
                return jsCode.replace(/&amp;/g, '&');
            };
            return jsCode;
        }

});

