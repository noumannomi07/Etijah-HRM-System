import os
import re

ROOT_DIR = "src"
ASSETS_PATH_PATTERN = r'@assets/images/([^"\']+)'

def fix_import_path(path: str):
    return re.sub(ASSETS_PATH_PATTERN, lambda m: f"@assets/images/{m.group(1).lower()}", path)

def process_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()

    new_content = fix_import_path(content)

    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(new_content)
        return True

    return False

def main():
    total_fixed = 0
    for dirpath, _, filenames in os.walk(ROOT_DIR):
        for filename in filenames:
            if filename.endswith((".ts", ".tsx", ".js", ".jsx")):
                full_path = os.path.join(dirpath, filename)
                if process_file(full_path):
                    print(f"✅ Fixed: {full_path}")
                    total_fixed += 1

    print(f"\n✅ FINAL FIX COMPLETE. Total corrected imports: {total_fixed}")

if __name__ == "__main__":
    main()
