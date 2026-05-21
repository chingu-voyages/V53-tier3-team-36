import Link from "next/link";

export default function BookCard({
  title,
  author,
  id,
  url,
  type,
}: {
  title: string;
  author: string;
  id: string;
  url: string;
  type: string;
}) {
  const extractedId = id.split("/")[2];

  return (
    <Link href={`${url}showDialog=y&work=${id}`} className="">
      <div className="flex flex-col m-4 max-w-[170px] book-card-hover" key={id}>
        <div className="rounded-2xl overflow-hidden shadow-card">
          {/* image section */}
          <img
            src={`https://covers.openlibrary.org/w/olid/${extractedId}.jpg`}
            alt="book cover"
            loading="lazy"
            className="rounded-2xl w-[160px] h-[240px] border border-border-light object-cover bg-gray-200"
            onError={(e) => {
              e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='240' viewBox='0 0 160 240'%3E%3Crect fill='%23e5e7eb' width='160' height='240'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3ENo Cover%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <span
          className={`pt-3 text-sm font-medium ${
            type === "light" ? "text-secondary-ivory" : "text-text-primary"
          } font-body line-clamp-2`}
        >
          {title}
        </span>
        {author ? (
          <span
            className={`text-sm ${
              type === "light" ? "text-accent-gold" : "text-text-secondary"
            } font-body`}
          >
            by {author}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
