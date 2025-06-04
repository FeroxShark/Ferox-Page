import re
from pathlib import Path


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

    js_content = js_path.read_text()
    config_match = re.search(r'const\s+userConfig\s*=\s*{.*?};', js_content, re.S)
    assert config_match, 'userConfig object not found in js/app.js'
    config_block = config_match.group(0)

    image_paths = set(re.findall(r"[\"'](img/[^\"']+)[\"']", config_block))
    assert image_paths, 'No image paths found in userConfig'
    for path in image_paths:
        assert Path(path).exists(), f"Missing asset: {path}"
