import re
from pathlib import Path


def test_gallery_functions_present():
    js = Path('js/app.js').read_text()
    assert 'const openLightbox' in js
    assert 'const closeLightbox' in js
    assert 'const showPrev' in js
    assert 'const showNext' in js


def test_gallery_item_handlers():
    js = Path('js/app.js').read_text()
    assert "onClick: () => openLightbox(idx)" in js
    assert "onKeyDown: (e)" in js


