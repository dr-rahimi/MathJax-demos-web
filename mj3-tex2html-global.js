/*************************************************************************
 *
 *  mj3-tex2html-global.js
 *
 *  Uses MathJax v3 to convert a TeX expression to an HTML tree.
 *
 * ----------------------------------------------------------------------
 *
 *  Copyright (c) 2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {TeX} from './v3/mathjax3/input/tex.js';
import {CHTML} from './v3/mathjax3/output/chtml.js';
import {HTMLMathItem} from './v3/mathjax3/handlers/html/HTMLMathItem.js';
import {HTMLDocument} from './v3/mathjax3/handlers/html/HTMLDocument.js';
import {browserAdaptor} from './v3/mathjax3/adaptors/browserAdaptor.js';

import './v3/mathjax3/input/tex/base/BaseConfiguration.js';
import './v3/mathjax3/input/tex/ams/AmsConfiguration.js';
import './v3/mathjax3/input/tex/noundefined/NoUndefinedConfiguration.js';
import './v3/mathjax3/input/tex/newcommand/NewcommandConfiguration.js';
import './v3/mathjax3/input/tex/boldsymbol/BoldsymbolConfiguration.js';

//
//  Create the input and output jax
//
const tex = new TeX({
    packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol']
});
const chtml = new CHTML({
    fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css'
});

//
//  Make a new HTML Math Document for the browser document
//
const doc = new HTMLDocument(document, browserAdaptor(), {InputJax: tex, OutputJax: chtml});

//
//  The MathJax object
//
window.MathJax = {
    //
    //  Return the stylesheet DOM node
    //
    Stylesheet: function () {
        return chtml.styleSheet(doc);
    },

    //
    //  Typeset a MathML expression and return the HTML tree for it
    //
    Typeset: function(string, display, em = 16, ex = 8, cwidth = 80*16) {
        let math = new HTMLMathItem(string, tex, display);
        math.setMetrics(em, ex, cwidth, 100000, 1);
        math.compile();
        math.typeset(doc)
        return math.typesetRoot;
    }
};
