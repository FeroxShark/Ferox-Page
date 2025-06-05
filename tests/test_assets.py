from pathlib import Path
import json
import re


def test_userconfig_assets_exist():
    html = Path("index.html").read_text()
    script_match = re.search(r'<script[^>]+src="([^\"]*src/main\.jsx)"', html)
    assert script_match, 'main script not found in index.html'
    js_path = Path(script_match.group(1).lstrip('/'))
    assert js_path.exists(), f"{js_path} does not exist"
def test_config_assets_exist():
    config_path = Path('data/config.json')
    assert config_path.exists(), 'config.json missing'
    config = json.loads(config_path.read_text())

    image_paths = set()
    image_paths.add(config.get('profileImageUrl'))
    for item in config.get('galleryItems', []):
        image_paths.add(item['imageUrl'])
    image_paths.update(config.get('backgroundImages', []))

    for path in image_paths:
        if path.startswith('img/'):
            assert Path(path).exists(), f'Missing asset: {path}'

