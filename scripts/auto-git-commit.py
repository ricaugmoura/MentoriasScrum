import os
import time
import subprocess

# Directories to exclude from monitoring
EXCLUDE_DIRS = {
    'node_modules', 
    '.git', 
    '.wwebjs_auth', 
    '.wwebjs_cache', 
    '.gemini', 
    '.kiro', 
    '.qoder', 
    '.claude', 
    '.cursor',
    '.impeccable',
    'public/assets' # compiled assets
}

# File extensions to ignore
EXCLUDE_EXTS = {'.log', '.tmp'}

def get_files_state(root_dir):
    state = {}
    for root, dirs, files in os.walk(root_dir):
        # Exclude directories in-place to prevent os.walk from entering them
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext in EXCLUDE_EXTS:
                continue
                
            file_path = os.path.join(root, file)
            try:
                state[file_path] = os.path.getmtime(file_path)
            except OSError:
                # File might have been deleted during walk
                pass
    return state

def run_git_auto_commit(root_dir):
    print("🔄 Auto Git Commit script active and monitoring...")
    print(f"Monitoring folder: {root_dir}")
    print(f"Excluding: {', '.join(EXCLUDE_DIRS)}")
    
    current_state = get_files_state(root_dir)
    
    while True:
        try:
            time.sleep(3)
            new_state = get_files_state(root_dir)
            
            # Check for changes
            has_changes = False
            
            # 1. Check for modified or deleted files
            for file_path, mtime in current_state.items():
                if file_path not in new_state:
                    print(f"🗑️ File deleted: {file_path}")
                    has_changes = True
                    break
                elif new_state[file_path] > mtime:
                    print(f"📝 File modified: {file_path}")
                    has_changes = True
                    break
            
            # 2. Check for newly added files
            if not has_changes:
                for file_path in new_state:
                    if file_path not in current_state:
                        print(f"➕ File added: {file_path}")
                        has_changes = True
                        break
            
            # If changes found, execute git commands
            if has_changes:
                print("📦 Committing changes automatically...")
                # Run git status, add and commit
                subprocess.run(["git", "add", "."], cwd=root_dir)
                commit_msg = f"auto: update code changes at {time.strftime('%Y-%m-%d %H:%M:%S')}"
                result = subprocess.run(["git", "commit", "-m", commit_msg], cwd=root_dir, capture_output=True, text=True)
                
                print(result.stdout.strip())
                # Update base state
                current_state = new_state
                
        except KeyboardInterrupt:
            print("\n⏹️ Auto Git Commit stopped.")
            break
        except Exception as e:
            print(f"⚠️ Error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    project_root = "/home/ricardo/Projetos/MentoriasScrum"
    run_git_auto_commit(project_root)
