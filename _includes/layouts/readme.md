    {#-
                                  Plain-text bundles are provided via the `eleventy-plugin-bundle` plugin:
                                  1. CSS:
                                    * Add to a per-page bundle using `{% css %}{% endcss %}`
                                    * Retrieve bundle content using `{% getBundle "css" %}` or `{% getBundleFileUrl "css" %}`
                                  2. Or for JavaScript:
                                    * Add to a per-page bundle using `{% js %}{% endjs %}`
                                    * Retrieve via `{% getBundle "js" %}` or `{% getBundleFileUrl "js" %}`
                                  3. Learn more: https://github.com/11ty/eleventy-plugin-bundle
                                #}
    {#- Add CSS to the bundle #}

    {#- Add the contents of a file to the bundle #}

{#- Or you can add from node_modules #}
{# <style>{% include "node_modules/something.css" %}</style> #}
{#- Render the CSS bundle using inlined CSS (for the fastest site performance in production) #}

    {#- Renders the CSS bundle using a separate file, if you can't set CSP directive style-src: 'unsafe-inline' #}

{#- <link rel="stylesheet" href="{% getBundleFileUrl "css" %}"> #}
