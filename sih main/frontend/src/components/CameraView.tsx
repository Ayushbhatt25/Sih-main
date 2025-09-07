import { useState, useRef } from "react";
import { Camera, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface CameraViewProps {
  onPhotoTaken: (photo: string) => void;
}

const CameraView = ({ onPhotoTaken }: CameraViewProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsCapturing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setTimeout(() => {
          setCapturedPhoto(result);
          setIsCapturing(false);
        }, 1000); // Simulate camera capture delay
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  const handleConfirm = () => {
    if (capturedPhoto) {
      onPhotoTaken(capturedPhoto);
      toast({
        title: "Photo captured!",
        description: "Ready to mark attendance for your students.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 shadow-large">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Capture Class Photo</h2>
          <p className="text-muted-foreground">
            Take a photo of your students to mark attendance
          </p>
        </div>

        <div className="relative">
          {/* Camera Preview Area */}
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden shadow-medium relative">
            {capturedPhoto ? (
              <img
                src={capturedPhoto}
                alt="Captured class photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                {isCapturing ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse">
                      <Camera size={64} className="text-primary mb-4" />
                    </div>
                    <p className="text-lg font-medium">Capturing...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Camera size={64} className="mb-4" />
                    <p className="text-lg font-medium">Camera Preview</p>
                    <p className="text-sm">Tap the camera button to take a photo</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex justify-center gap-4 mt-6">
            {capturedPhoto ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleRetake}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Retake
                </Button>
                <Button
                  variant="success"
                  size="lg"
                  onClick={handleConfirm}
                  className="flex items-center gap-2"
                >
                  <Check size={20} />
                  Use Photo
                </Button>
              </>
            ) : (
              <Button
                variant="camera"
                size="camera"
                onClick={handleCameraClick}
                disabled={isCapturing}
                className="shadow-large hover:shadow-glow"
              >
                <Camera size={32} />
              </Button>
            )}
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {!capturedPhoto && (
          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-accent-foreground">
              <strong>Tip:</strong> Position your camera to capture all students clearly. 
              Good lighting helps with better recognition!
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CameraView;