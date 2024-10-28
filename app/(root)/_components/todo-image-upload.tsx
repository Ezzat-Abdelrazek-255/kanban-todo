import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ImageMetadata } from "@/types";

const supabase = createClient();

const ImageUpload = ({
  onUploadComplete,
  uploading,
  setUploading,
}: {
  onUploadComplete: (metadata: ImageMetadata) => void;
  uploading: boolean;
  setUploading: (_: boolean) => void;
}) => {
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);

      const file = event.target.files?.[0];
      if (!file) return;

      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from("todo_covers")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Create metadata object
      const metadata: ImageMetadata = {
        path: filePath,
        size: file.size,
        mime_type: file.type,
      };

      // Pass the metadata back to parent component
      onUploadComplete(metadata);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="file"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
        className="p-2 bg-black border-muted font-serif rounded-[4px] text-xs"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
