---
name: azarian-site-architecture
description: How the Azarian Home Page project is built (dc-runtime, .dc.html components)
metadata:
  type: project
---

The Azarian Home Page site is NOT a framework build — it's a set of `.dc.html` files rendered by a custom React-based runtime in `support.js` ("dc-runtime", GENERATED — never edit it).

Each `.dc.html` = a DC component: an `<x-dc>` template (with `{{ }}` interpolation, `ref="{{ setX }}"`, `style-hover`, `sc-for`, `sc-if`) plus an inline `<script type="text/x-dc" data-dc-script>` defining `class Component extends DCLogic` with React-style lifecycle (`componentDidMount`, `componentDidUpdate`, `renderVals()` returns ref-setters used in the template). Pages enhance imperatively in `componentDidMount` (the established pattern for DOM/animation work).

Reuse across files: `<dc-import name="Foo" />` makes the runtime fetch `./Foo.dc.html` and render it as a component. This is how the shared nav (`Nav.dc.html`) is reused on both `Azarian Home.dc.html` and `Azarian About.dc.html`.

Pages: `Azarian Home.dc.html` (main, ~3000 lines), `Azarian About.dc.html`. Both load `./support.js`. Accent color is `--accent` set on the root div (#1BFED1 home / #1FC9A0 about). Font: Poppins. Served over HTTP in preview (runtime does `fetch(location.href)`).
