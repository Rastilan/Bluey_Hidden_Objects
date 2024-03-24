import shutil

def copy_and_rename_files():
    for season in range(1, 4):  # Seasons 01 to 03
        for episode in range(1, 53):  # Episodes 01 to 52
            if season == 1 and episode == 1:
                # Skip S01-Ep01 as it already exists
                continue
            
            # Original file names
            original_hidden_file = f"S01-Ep01-Hidden.jpg"
            original_shown_file = f"S01-Ep01-Shown.jpg"

            # New file names
            new_hidden_file = f"S{season:02d}-Ep{episode:02d}-hidden.jpg"
            new_shown_file = f"S{season:02d}-Ep{episode:02d}-shown.jpg"

            # Copy and rename files
            shutil.copy(original_hidden_file, new_hidden_file)
            shutil.copy(original_shown_file, new_shown_file)

            print(f"Files copied and renamed: {new_hidden_file}, {new_shown_file}")

if __name__ == "__main__":
    copy_and_rename_files()
