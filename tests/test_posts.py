from pathlib import Path

def test_posts_exist():
    mdx_files = list(Path('src/posts').glob('*.mdx'))
    assert mdx_files, 'No MDX posts found'
    for f in mdx_files:
        assert f.read_text().strip(), f'{f} is empty'
