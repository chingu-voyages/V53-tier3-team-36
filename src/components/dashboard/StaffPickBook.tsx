import Link from "next/link";

export default function StaffPickBook({
  id,
  url,
  order,
}: {
  id: string;
  url: string;
  order: number;
}) {
  const extractedId = id.split("/")[2];

  return (
    <Link href={`${url}showDialog=y&work=${id}`} className="">
      <div className="flex flex-col m-4 max-w-[170px] book-card-hover" key={id}>
        <div className="rounded-2xl overflow-hidden shadow-card">
          <img
            src={`https://covers.openlibrary.org/w/olid/${extractedId}.jpg`}
            alt="book cover"
            className="rounded-2xl w-[160px] h-[240px] border border-border-light object-cover"
          />
        </div>
        <div className="text-6xl font-bold absolute bottom-[24px] left-[-1px] text-accent-gold font-display drop-shadow-lg">
          {order}
        </div>
      </div>
    </Link>
  );
}
