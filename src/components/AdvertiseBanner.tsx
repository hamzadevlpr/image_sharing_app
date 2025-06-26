import { Megaphone } from "lucide-react";

const AdvertiseBanner: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-gradient-to-br from-teal-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm text-center space-y-2">
      <div className="flex items-center justify-center gap-2 text-teal-700 font-medium">
        <Megaphone className="h-4 w-4" />
        <span>Promote Your Image</span>
      </div>
      <p className="text-sm text-slate-600">
        Get your image in front of thousands of people by featuring it in our gallery.
      </p>
      <button className="mt-2 px-4 py-1.5 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
        Advertise Now
      </button>
    </div>
  );
};

export default AdvertiseBanner;
