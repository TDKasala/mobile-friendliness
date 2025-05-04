
import WhatsAppAlerts from "@/components/WhatsAppAlerts";

const WhatsAppAlertsSection = () => {
  return (
    <section className="py-8 bg-[#F2FCE2] border-y border-sa-green/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-sa-green mb-3">
            Stay Updated with WhatsApp Alerts
          </h2>
          <p className="text-sa-gray mb-6">
            Join our WhatsApp service to receive weekly job alerts, daily CV tips, and upload your CV directly via WhatsApp.
          </p>
          <div className="flex justify-center">
            <WhatsAppAlerts className="py-3 px-6 text-base" />
          </div>
          <p className="text-xs text-sa-gray/80 mt-4">
            You can unsubscribe at any time by messaging "STOP"
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppAlertsSection;
