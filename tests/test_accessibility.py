import json
from pathlib import Path

def test_gallery_alt_text():
    config = json.loads(Path('data/config.json').read_text())
    for item in config.get('galleryItems', []):
        assert item.get('description'), f"Missing description for {item['imageUrl']}"

def test_social_icons_have_names():
    config = json.loads(Path('data/config.json').read_text())
    for link in config.get('socialMediaLinks', []):
        assert link.get('name'), f"Missing name for {link['url']}"
