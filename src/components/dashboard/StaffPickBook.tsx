import Link from "next/link";

export default function StaffPickBook({
  id,
  url,
}: {
  id: string;
  url: string;
}) {
  const extractedId = id.split("/")[2];

  return (
    <Link href={`${url}showDialog=y&work=${id}`} className="">
      <div className="flex flex-col m-4 max-w-[170px]" key={id}>
        <div className="rounded-[20px] overflow-hidden">
          <img
            src={`https://covers.openlibrary.org/w/olid/${extractedId}.jpg`}
            alt="book cover"
            className="rounded-[20px] w-[160px] h-[240px] border border-gray-700 shadow-lg"
          />
        </div>
      </div>
    </Link>
  );
}
