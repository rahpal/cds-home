import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GradientText } from "./GradientText";

interface SectionHeaderProps {
  label: string;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  highlightWord,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  const parts = highlightWord ? title.split(highlightWord) : [title];

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Badge variant="accent" className="w-fit text-xs uppercase tracking-widest">
        {label}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary max-w-2xl">
        {highlightWord ? (
          <>
            {parts[0]}
            <GradientText>{highlightWord}</GradientText>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
