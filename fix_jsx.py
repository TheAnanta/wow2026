import os

def main():
    file_path = 'src/app/explore/page.tsx'
    
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    original_count = len(lines)
    # Keep only lines that contain more than just whitespace characters
    new_lines = [line for line in lines if line.strip()]
    new_count = len(new_lines)

    if original_count == new_count:
        print("No empty lines were found.")
    else:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Cleaned up {file_path}")
        print(f"Lines removed: {original_count - new_count}")
        print(f"Remaining lines: {new_count}")

if __name__ == "__main__":
    main()