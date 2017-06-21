<h3 id="general-instructions-for-apghtml-examples">General Instructions for <strong>apg.html</strong> Examples.</h3>

<p>Providing hands-on examples for a GUI interface is not as straight forward as for static, command-line examples or single HTML-page examples. <strong>apg.html</strong> requires several different types of input, including manual keyboard actions. The approach here is that for each example, a grammar and one or more parser input files will be provided, along with a “README.html” file to provide instructions and suggestions for completing the example. General instructions that can be followed for each of the examples are given here and not repeated in each specific example.</p>

<h4 id="the-grammar">The Grammar</h4>

<p>Open the <code>grammar.bnf</code> file and paste it into the <code>Generator</code> panel. Click <code>Generate</code>. The <code>Parser</code> panel will open and display the generated parser. You may find it instructive to click on the <code>Grammar</code>, <code>Rules</code> and <code>Attributes</code> panels to see specific details about the grammar. But if this were your own grammar and the parser were all you wanted, at this point you would simply copy the contents of the <code>Parser</code> panel &lt;textarea&gt; and paste it into your application. For the examples, however, click <code>Input</code> to open up the input &lt;textarea&gt;.</p>

<h4 id="the-input">The Input</h4>

<p>Open one of the input (*.txt) files in a text editor. Copy and paste it into the <code>Input</code> &lt;textarea&gt; and click <code>Parse Input</code>. The <code>Phrases</code> panel will open and you can use the drop-down menu to select a phrase name and the arrow buttons to peruse the matched phrases. For more detail, click the <code>Configure</code> panel. Here you can choose to show the trace and select which rules and operators to display.</p>