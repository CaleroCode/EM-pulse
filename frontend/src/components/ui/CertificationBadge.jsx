import { Shield, CheckCircle, Award } from "lucide-react";

export default function CertificationBadge({ type = "gdpr" }) {
  const badges = {
    gdpr: {
      icon: Shield,
      label: "GDPR Compliant",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    verified: {
      icon: CheckCircle,
      label: "Verified Content",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    certified: {
      icon: Award,
      label: "Certified",
      color: "text-empulsePrimary",
      bgColor: "bg-empulsePrimary/10",
      borderColor: "border-empulsePrimary/30"
    }
  };

  const badge = badges[type] || badges.gdpr;
  const Icon = badge.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${badge.bgColor} border ${badge.borderColor}`}>
      <Icon className={`w-3 h-3 ${badge.color}`} />
      <span className={`text-xs font-semibold ${badge.color}`}>
        {badge.label}
      </span>
    </div>
  );
}
