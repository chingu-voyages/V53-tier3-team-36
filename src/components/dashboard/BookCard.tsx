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
            className="rounded-2xl w-[160px] h-[240px] border border-border-light object-cover"
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
