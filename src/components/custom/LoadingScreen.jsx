import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <Card className="p-6 shadow-lg border border-purple-100 rounded-2xl bg-white/80 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
          <p className="text-sm text-gray-600 font-medium">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default  LoadingScreen