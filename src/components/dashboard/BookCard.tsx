import Link from "next/link";

export default function BookCard({
  title,
  author,
  id,
  url,
}: {
  title: string;
  author: string;
  id: string;
  url: string;
}) {
  const extractedId = id.split("/")[2];

  return (
    <Link href={`${url}showDialog=y&work=${id}`} className="">
      <div className="flex flex-col m-4 max-w-[170px]" key={id}>
        <div className="rounded-[20px] overflow-hidden">
          {/* image section */}
          <img
            src={`https://covers.openlibrary.org/w/olid/${extractedId}.jpg`}
            alt="book cover"
            className="rounded-[20px] w-[160px] h-[240px] border border-gray-700 shadow-lg"
          />
        </div>
        <span className="pt-2 text-sm text-amber-50 font-lumiFontChivo">
          {title}
        </span>
        {author ? (
          <span className="text-sm text-amber-500">by {author}</span>
        ) : null}
      </div>
    </Link>
  );
}
