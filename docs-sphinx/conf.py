import os
import sys
from datetime import datetime

project = 'HoneyHive TypeScript SDK'
copyright = f'{datetime.now().year}, HoneyHive'
author = 'HoneyHive'

extensions = [
    'myst_parser',
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
]

myst_enable_extensions = [
    'colon_fence',
    'deflist',
]

myst_all_links_external = True
myst_heading_anchors = 3

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']

html_theme_options = {
    'navigation_depth': 4,
    'collapse_navigation': False,
    'sticky_navigation': True,
}

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}
