from pathlib import Path
import json


def test_userconfig_assets_exist():
    html = Path("index.html").read_text()
    script_match = re.search(r'<script[^>]+src="([^\"]*js/(?:main|app)\.js)"', html)
    assert script_match, 'main script not found in index.html'
    js_path = Path(script_match.group(1))
    assert js_path.exists(), f"{js_path} does not exist"
    if js_path.name == 'main.js':
        main_content = js_path.read_text()
        import_match = re.search(r"import\(['\"]([^'\"]*app\.js)['\"]\)", main_content)
        assert import_match, 'app.js not imported in main.js'
        js_path = js_path.parent / import_match.group(1)
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
        assert Path(path).exists(), f'Missing asset: {path}'

