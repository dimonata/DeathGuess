import Image from "next/image";
import type { HistoricalEvent } from "@/types/game";
import { ExternalLink, MapPin } from "@/components/ui/Icons";

type EventVisualProps = {
  event: HistoricalEvent;
};

export function EventVisual({ event }: EventVisualProps) {
  return (
    <div className="event-visual">
      <Image
        key={event.image}
        src={event.image}
        alt={event.imageAlt}
        fill
        loading="eager"
        sizes="(max-width: 900px) 100vw, 58vw"
        className="event-visual__image"
      />
      <div className="event-visual__wash" />
      <span className="event-visual__index" aria-hidden="true">{String(event.id).padStart(2, "0")}</span>

      <div className="event-visual__content">
        <span className="category-badge">{event.category}</span>
        <h1>{event.title}</h1>
        <p><MapPin /> {event.location} <i /> {event.year}</p>
      </div>

      <a
        className="image-credit"
        href={event.imageSourceUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Image credit: ${event.imageAttribution}`}
      >
        Image: {event.imageAttribution} <ExternalLink />
      </a>
    </div>
  );
}
