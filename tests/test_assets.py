from pathlib import Path
import json


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

