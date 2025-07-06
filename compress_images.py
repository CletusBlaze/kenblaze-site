from PIL import Image
import os

def compress_images(input_folder, output_folder, quality=85, max_width=1200):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            
            with Image.open(input_path) as img:
                # Convert to RGB if needed
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Resize if too wide
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Save with compression
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
                print(f"Compressed: {filename}")

if __name__ == "__main__":
    compress_images("pics_original", "pics", quality=80, max_width=1200)
    print("Image compression complete!")